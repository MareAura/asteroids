import React from 'react'
import './asteroidCard.css'
import asteroidRock from './assets/asteroid-rock.png'
import warningSign from './assets/warning-sign.png'
import warningSignGrey from './assets/warning-sign-grey.png'
import clock from './assets/clock.png'
import distance from './assets/distance.png'
import diameterIcon from './assets/diameter.png'
import { Link } from 'react-router-dom'

export const AsteroidCard = (props) => {

  let diameter = props.asteroid.diameter

  let asteroidPictureSize;

  if (diameter > 0 && diameter < 50) {
    asteroidPictureSize = 20
  } else if (diameter >= 50 && diameter < 100) {
    asteroidPictureSize = 25
  } else if (diameter >= 100 && diameter < 200) {
    asteroidPictureSize = 30
  } else if (diameter >= 200 && diameter < 300) {
    asteroidPictureSize = 40
  } else if (diameter >= 300 && diameter < 400) {
    asteroidPictureSize = 50
  } else if (diameter >= 400 && diameter < 500) {
    asteroidPictureSize = 60
  } else if (diameter >= 500 && diameter < 800) {
    asteroidPictureSize = 70
  } else if (diameter >= 800 && diameter < 1000) {
    asteroidPictureSize = 80
  } else if (diameter >= 1000) {
    asteroidPictureSize = 90
  } else if (diameter === 'unknown') {
    asteroidPictureSize = 30
  }

  return (
    <div className='asteroid-card' key={props.asteroid.id}>
              <div className='asteroid-avatar'>
                <Link to={`/${props.asteroid.id}`}>
                  <img src={asteroidRock} 
                  alt='asteroid rock' 
                  className='asteroid-avatar-icon' 
                  style={{width: asteroidPictureSize}}/>
                </Link>
              </div>
              <div className='asterid-card-name'>
                    <Link to={`/${props.asteroid.id}`}>
                      {props.asteroid.name}
                    </Link>
              </div>
              <div className='asterid-card-info-line'>
                <img src={diameterIcon} alt='diameter icon'/> 
                {props.asteroid.diameter} {props.asteroid.diameter !== 'unknown' && 'meters'}
              </div>
              <div className='asterid-card-info-line'>
                <img src={clock} alt='clock icon'/>
                {props.asteroid.closeApproachDate}
              </div>
              {props.distanceInKm 
                ? <div className='asterid-card-info-line'>
                    <img src={distance} alt='distance icon'/>{props.asteroid.distanceKm} km
                  </div> 
                : <div className='asterid-card-info-line'>
                    <img src={distance} alt='distance icon'/>{props.asteroid.distanceLunar} lunar
                  </div>
              }
              
              {props.asteroid.dangerous 
                ? <div className='asterid-card-info-line'>
                    <img src={warningSign} alt='warning sign icon'/>Dangerous!
                  </div> 
                : <div className='asterid-card-info-line'>
                    <img src={warningSignGrey} alt='warning sign icon'/>Not dangerous
                  </div>}
    </div>
  )
}
