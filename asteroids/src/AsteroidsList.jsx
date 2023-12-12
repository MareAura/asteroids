import React from 'react'
import { useEffect, useState } from 'react';
import axios from "axios";
import { AsteroidCard } from './AsteroidCard.jsx';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import { enGB } from 'date-fns/locale';


registerLocale('en-GB', enGB)


function AsteroidsList() {

    const [asteroidsData, setAsteroidsData] = useState([])

    const [distanceInKm, setDistanceInKm] = useState(true)

    const [ page, setPage] = useState(1)

    const [date, setDate] = useState(new Date());

    const convertedDate = date.toISOString().slice(0, 10)

    useEffect(() => {
      axios
              .get(
                  `https://www.neowsapp.com/rest/v1/feed?start_date=${convertedDate}&end_date=${convertedDate}?api_key=3O93YcjVXfreFogJawULO4fHalcOlw8GYPn9BVut`
              )
              .then((response) => {
                  const convertedAsteroidsData = convertAsteroidsData(response.data)
                  setAsteroidsData(convertedAsteroidsData);
              });
    }, [convertedDate])

    let distanceUnitButton

    if(distanceInKm) {
        distanceUnitButton = <button onClick={() => setDistanceInKm(false)}>Show distance in lunar</button>
    } else {
        distanceUnitButton = <button onClick={() => setDistanceInKm(true)}>Show distance in kilometers</button>
    }

    const asteroidsShown = 5 * page
    const fullAsteroidsDataShown = asteroidsShown >= asteroidsData.length
    

  return (
    <div className='asteroids-list'>
       <div>
          <DatePicker
              showIcon
              selected={date}
              onChange={(newDate) => setDate(newDate)}
              locale="en-GB"
              dateFormat="dd MMMM yyyy"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 48 48"
                >
                  <mask id="ipSApplication0">
                    <g fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="4">
                      <path strokeLinecap="round" d="M40.04 22v20h-32V22"></path>
                      <path
                        fill="#fff"
                        d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
                      ></path>
                    </g>
                  </mask>
                  <path
                    fill="currentColor"
                    d="M0 0h48v48H0z"
                    mask="url(#ipSApplication0)"
                  ></path>
                </svg>
              }
          />
      </div>
        {distanceUnitButton}
            {asteroidsData.slice(0, asteroidsShown).map((asteroid) => {
              return (
                <Link to={`/${asteroid.id}`} key={asteroid.id}>
                    <AsteroidCard asteroid={asteroid} distanceInKm={distanceInKm}/>
                </Link>
              ) 
            })
          }
          {!fullAsteroidsDataShown && <button onClick={() => setPage(page + 1)}>More</button>}
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
