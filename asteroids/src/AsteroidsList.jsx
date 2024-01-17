import React from 'react'
import { useEffect, useState } from 'react';
import axios from "axios";
import { AsteroidCard } from './AsteroidCard.jsx';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import { enGB } from 'date-fns/locale';
import comet from './assets/comet.png';
import cometGrey from './assets/comet-grey.png'



registerLocale('en-GB', enGB)


function AsteroidsList(props) {

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
        distanceUnitButton = 
          <button onClick={() => setDistanceInKm(false)} className='distance-unit-btn'>
            Show distance to Earth in lunar
          </button>
    } else {
        distanceUnitButton = 
        <button onClick={() => setDistanceInKm(true)} className='distance-unit-btn'>
          Show distance to Earth in kilometers
        </button>
    }

    const asteroidsShown = 6 * page
    const fullAsteroidsDataShown = asteroidsShown >= asteroidsData.length
    
  return (
    <div className='main-page'>
      <div className='date-picker'>
        <span className='date-picker-text'>Pick a date to display a list of asteroids approaches to Earth</span>
          <DatePicker
              showIcon
              selected={date}
              onChange={(newDate) => {
                setDate(newDate)
                setPage(1)
              }
            }
              locale="en-GB"
              dateFormat="dd MMMM yyyy"
          />
      </div>
      <span>{distanceUnitButton}</span>
      <div className='asteroids-list'>
            {asteroidsData.slice(0, asteroidsShown).map((asteroid) => {
              
              const isFavorite = props.favorite.some((item) => item.id === asteroid.id)
              
              return (
                <div key={asteroid.id} className='asteroid-card-wrapper'>
                  {!isFavorite 
                    ?<button onClick={() => props.addFavorite(asteroid)} className='favorite-btn' title='Add to favorite'>
                        <img src={cometGrey} alt='add to favorite asteroid' className='favorite-btn-icon'/>
                      </button>
                    :<button onClick={() => props.removeFavorite(asteroid.id)} className='favorite-btn' title='Remove from favorite'>
                        <img src={comet} alt='remove favorite asteroid' className='favorite-btn-icon'/>
                     </button>
                  }
                  <AsteroidCard asteroid={asteroid} distanceInKm={distanceInKm}/>
                </div>
              ) 
            })
          }
      </div>
          {!fullAsteroidsDataShown && <button onClick={() => setPage(page + 1)} className='more-btn'>Show more</button>}
    </div>
  )
}

function convertAsteroidsData(rawData) {

    const nearEarthObjects = Object.values(rawData.near_earth_objects)[0]
  
    const asteroids = nearEarthObjects.map((rawAsteroid) => {
          const asteroid = {
            id: rawAsteroid.id,
            closeApproachDate: rawAsteroid.close_approach_data[0].close_approach_date_full,
            name: rawAsteroid.name[0] === '(' 
                  ? rawAsteroid.name.slice(1, rawAsteroid.name.length - 1) 
                  : rawAsteroid.name,
            distanceKm: Math.round(rawAsteroid.close_approach_data[0].miss_distance.kilometers),
            distanceLunar: Math.round(rawAsteroid.close_approach_data[0].miss_distance.lunar),
            diameter: rawAsteroid.estimated_diameter
                  ? Math.round(rawAsteroid.estimated_diameter.meters.estimated_diameter_max)
                  : 'unknown',
            dangerous: rawAsteroid.is_potentially_hazardous_asteroid
          }
  
          return asteroid
      }
    )
  
    return asteroids
  }

export default AsteroidsList
