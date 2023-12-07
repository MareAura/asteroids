import React from 'react'
import { useEffect, useState } from 'react';
import axios from "axios";
import { AsteroidCard } from './AsteroidCard.jsx';
import { Link } from 'react-router-dom';


function AsteroidsList() {

    const [asteroidsData, setAsteroidsData] = useState([])

    const [distanceInKm, setDistanceInKm] = useState(true)


    useEffect(() => {
      axios
              .get(
                  `https://www.neowsapp.com/rest/v1/feed/today?api_key=3O93YcjVXfreFogJawULO4fHalcOlw8GYPn9BVut`
              )
              .then((response) => {
                  const convertedAsteroidsData = convertAsteroidsData(response.data)
                  setAsteroidsData(convertedAsteroidsData);
              });
    }, [])

    let distanceUnitButton

    if(distanceInKm) {
        distanceUnitButton = <button onClick={() => setDistanceInKm(false)}>Show distance in lunar</button>
    } else {
        distanceUnitButton = <button onClick={() => setDistanceInKm(true)}>Show distance in kilometers</button>
    }
  

  return (
    <div className='asteroids-list'>
        {distanceUnitButton}
            {asteroidsData.map((asteroid) => {
              return (
                <Link to={`/${asteroid.id}`} key={asteroid.id}>
                    <AsteroidCard asteroid={asteroid} distanceInKm={distanceInKm}/>
                </Link>
              ) 
            })
          }
    </div>
  )
}

function convertAsteroidsData(rawData) {

    const nearEarthObjects = Object.values(rawData.near_earth_objects)[0]
  
    const asteroids = nearEarthObjects.map((rawAsteroid) => {
          const asteroid = {
            id: rawAsteroid.id,
            closeApproachDate: rawAsteroid.close_approach_data[0].close_approach_date_full,
            name: rawAsteroid.name.slice(1, rawAsteroid.name.length - 1),
            distanceKm: Math.round(rawAsteroid.close_approach_data[0].miss_distance.kilometers),
            distanceLunar: Math.round(rawAsteroid.close_approach_data[0].miss_distance.lunar),
            diameter: Math.round(rawAsteroid.estimated_diameter.meters.estimated_diameter_max),
            dangerous: rawAsteroid.is_potentially_hazardous_asteroid
          }
  
          return asteroid
      }
    )
  
    return asteroids
  }

export default AsteroidsList