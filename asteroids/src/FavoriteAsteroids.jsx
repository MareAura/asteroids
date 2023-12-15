import React from 'react'

function FavoriteAsteroids(props) {
  return (
    <div>
        {props.favorite.map((asteroid) => {
            return (
            <div key={asteroid.id}>
                <span>{asteroid.name}</span>
                <button onClick={() => props.removeFavorite(asteroid.id)}>X</button>
            </div>)
        })}
    </div>
  )
}

export default FavoriteAsteroids