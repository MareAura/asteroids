import React from 'react';
import { Link } from 'react-router-dom';


function FavoriteAsteroids(props) {
  return (
    <div>
        {props.favorite.map((asteroid) => {
            return (
            <div key={asteroid.id}>
                <Link to={`/${asteroid.id}`}>{asteroid.name}</Link>
                <button onClick={() => props.removeFavorite(asteroid.id)}>X</button>
            </div>)
        })}
    </div>
  )
}

export default FavoriteAsteroids