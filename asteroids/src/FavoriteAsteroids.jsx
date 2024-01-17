import React from 'react';
import { Link } from 'react-router-dom';
import './favoriteAsteroids.css'
import diameterIcon from './assets/diameter.png'
import warningSign from './assets/warning-sign.png'
import warningSignGrey from './assets/warning-sign-grey.png'
import bin from './assets/bin.png'


function FavoriteAsteroids(props) {
  return (
    <div className='favorite-asteroids-page'>
      <div className='favorite-asteroids-header'>Your favorite asteroids</div>
        {props.favorite.length === 0 
          ? <div>You haven't added your favorite asteroids yet</div> 
          : props.favorite.map((asteroid) => {
            return (
            <div key={asteroid.id} className='favorite-asteroid-card'>
                <div className='favorite-asterid-name-wrapper'>
                  <Link to={`/${asteroid.id}`} className='favorite-asterid-name'>Asteroid {asteroid.name}</Link>
                  <div onClick={() => props.removeFavorite(asteroid.id)} className='delete-btn'>
                    <img src={bin} alt='delete icon'/>
                  </div>
                </div>
                <div className='favorite-asteroid-info-line'><img src={diameterIcon} alt='diameter icon'/>{asteroid.diameter || Math.round(asteroid.diameterMax)} meters</div>
                {asteroid.dangerous 
                    ? <div className='favorite-asteroid-info-line'><img src={warningSign} alt='warning sign icon'/>Dangerous!</div> 
                    : <div className='favorite-asteroid-info-line'><img src={warningSignGrey} alt='warning sign icon'/>Not dangerous</div>
                }
            </div>)
        })}
    </div>
  )
}

export default FavoriteAsteroids