import React from 'react'
import { useEffect, useState } from 'react';
import axios from "axios";
import { AsteroidCard } from './asteroidCard';
import { Link } from 'react-router-dom';


function AsteroidsList() {

    const [asteroidsData, setAsteroidsData] = useState([])

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
  

  return (
    <div className='asteroids-list'>
            {asteroidsData.map((asteroid) => {
              return (
                <Link to={`/${asteroid.id}`} key={asteroid.id}><AsteroidCard asteroid={asteroid} /></Link>
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
            distanceKm: rawAsteroid.close_approach_data[0].miss_distance.kilometers.split('.')[0],
            distanceLunar: rawAsteroid.close_approach_data[0].miss_distance.lunar.split('.')[0],
            diameter: String(rawAsteroid.estimated_diameter.meters.estimated_diameter_max).split('.')[0],
            dangerous: rawAsteroid.is_potentially_hazardous_asteroid
          }
  
          return asteroid
      }
    )
  
    return asteroids
  }

export default AsteroidsList
