import React from 'react'

export const AsteroidCard = (props) => {
  return (
    <div className='asteroid-card' key={props.asteroid.id}>
              <div>{props.asteroid.closeApproachDate}</div>
              <div>Name: {props.asteroid.name}</div>
              <div>Distance: {props.asteroid.distanceKm} km</div>
              <div>Distance: {props.asteroid.distanceLunar} lunar</div>
              <div>Diameter: {props.asteroid.diameter} meters</div>
              {props.asteroid.dangerous ? <div>Dangerous!</div> : <div>Not dangerous</div>}
    </div>
  )
}
