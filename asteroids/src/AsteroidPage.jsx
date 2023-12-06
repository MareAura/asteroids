import React from 'react'
import { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function AsteroidPage() {

    const [asteroidData, setAsteroidData] = useState(null)

    let { asteroidId } = useParams()

    useEffect(() => {
        axios
                .get(
                    `https://www.neowsapp.com/rest/v1/neo/${asteroidId}?api_key=3O93YcjVXfreFogJawULO4fHalcOlw8GYPn9BVut`
                )
                .then((response) => {
                    const convertedAsteroidData = convertAsteroidData(response.data)
                    setAsteroidData(convertedAsteroidData);
                });
      }, [])
    
  return (
    <div>
    {asteroidData ? 
        <div>
            <div>Name: {asteroidData.name}</div>
            <div> Estimated diameter (min): {asteroidData.diameterMin} m</div>
            <div>Estimated diameter (max): {asteroidData.diameterMax} m</div>
            {asteroidData.dangerous ? <div>Dangerous!</div> : <div>Not dangerous</div>}
            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Date</th>
                        <th>Relative Velocity, km/sec </th>
                        <th>Relative Velocity, km/hour </th>
                        <th>Distance to Earth, km</th>
                        <th>Distance to Earth, lunar</th>
                        <th>Orbiting body</th>
                    </tr>
                </thead>
                <tbody>
                {asteroidData.approachesData.map((data, index) => {
                    return (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{data.fullDate}</td>
                        <td>{data.relativeVelocityKmPerSec}</td>
                        <td>{data.relativeVelocityKmPerH}</td>
                        <td>{data.distanceKm}</td>
                        <td>{data.distanceLunar}</td>
                        <td>{data.orbitingBody}</td>
                    </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
        : null}
        <Link to={`/`}>Main page</Link>    
    </div>
  )
}

function convertAsteroidData(rawAsteroid) {

    function convertApproachesData(rawApproachesData){

        const allApproachesData = rawApproachesData.map((rawApproachData) => {
            const approachData = {
                fullDate: rawApproachData.close_approach_date_full,
                relativeVelocityKmPerSec: Math.round(rawApproachData.relative_velocity.kilometers_per_second * 100) / 100,
                relativeVelocityKmPerH: Math.round(rawApproachData.relative_velocity.kilometers_per_hour),
                distanceKm: Math.round(rawApproachData.miss_distance.kilometers),
                distanceLunar: Math.round(rawApproachData.miss_distance.lunar *10) / 10,
                orbitingBody: rawApproachData.orbiting_body

            }

            return approachData
        })

        return allApproachesData

    }
     
    const asteroid = {
        id: rawAsteroid.id,
        name: rawAsteroid.designation,
        dangerous: rawAsteroid.is_potentially_hazardous_asteroid,
        diameterMin: Math.round(rawAsteroid.estimated_diameter.meters.estimated_diameter_min * 10) / 10,
        diameterMax: Math.round(rawAsteroid.estimated_diameter.meters.estimated_diameter_max * 10) / 10,
        approachesData: convertApproachesData(rawAsteroid.close_approach_data)
      }
     
    return asteroid
  }

export default AsteroidPage