import React from 'react'
import { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';

function AsteroidPage() {

    const [asteroidData, setAsteroidData] = useState(null)

    let { asteroidId } = useParams()

    const [distanceInKm, setDistanceInKm] = useState(true)

    const [velocityInKmH, setvelocityInKmH] = useState(true)

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
    

      let distanceUnitButton

      if(distanceInKm) {
          distanceUnitButton = <button onClick={() => setDistanceInKm(false)}>Show distance in lunar</button>
      } else {
          distanceUnitButton = <button onClick={() => setDistanceInKm(true)}>Show distance in kilometers</button>
      }

      let velocityUnitButton

      if(velocityInKmH) {
        velocityUnitButton = <button onClick={() => setvelocityInKmH(false)}>Show distance in km/sec</button>
      } else {
        velocityUnitButton = <button onClick={() => setvelocityInKmH(true)}>Show distance in km/hour</button>
      }



  return (
    <div>
        {asteroidData ? 
            <div>
                <div>Name: {asteroidData.name}</div>
                <div>Estimated diameter (min): {asteroidData.diameterMin} m</div>
                <div>Estimated diameter (max): {asteroidData.diameterMax} m</div>
                {asteroidData.dangerous ? <div>Dangerous!</div> : <div>Not dangerous</div>}

                {velocityUnitButton}
                {distanceUnitButton}

                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Date</th>
                            {velocityInKmH
                                ? <th>Relative Velocity, km/hour</th>
                                : <th>Relative Velocity, km/sec</th>
                            }
                            {distanceInKm 
                                ? <th>Distance to Earth, km</th>
                                : <th>Distance to Earth, lunar</th>
                            }
                            <th>Orbiting body</th>
                        </tr>
                    </thead>
                    <tbody>
                    {asteroidData.approachesData.map((data, index) => {
                        return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{data.fullDate}</td>
                            {velocityInKmH 
                                ? <td>{data.relativeVelocityKmPerH}</td>
                                : <td>{data.relativeVelocityKmPerSec}</td>
                            }
                            {distanceInKm 
                                ? <td>{data.distanceKm}</td>
                                : <td>{data.distanceLunar}</td>
                            }
                            <td>{data.orbitingBody}</td>
                        </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
            : null}
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
                distanceLunar: Math.round(rawApproachData.miss_distance.lunar * 10) / 10,
                orbitingBody: rawApproachData.orbiting_body

            }

            return approachData
        })

        return allApproachesData

    }
     
    const asteroid = {
        id: rawAsteroid.id,
        name: rawAsteroid.name[0] === '(' 
                ? rawAsteroid.name.slice(1, rawAsteroid.name.length - 1) 
                : rawAsteroid.name,
        dangerous: rawAsteroid.is_potentially_hazardous_asteroid,
        diameterMin: Math.round(rawAsteroid.estimated_diameter.meters.estimated_diameter_min * 10) / 10,
        diameterMax: Math.round(rawAsteroid.estimated_diameter.meters.estimated_diameter_max * 10) / 10,
        approachesData: convertApproachesData(rawAsteroid.close_approach_data)
      }
     
    return asteroid
  }

export default AsteroidPage