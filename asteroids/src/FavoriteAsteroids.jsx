import React from 'react'

function FavoriteAsteroids(props) {
  return (
    <div>
        {props.favorite.map((asteroid) => {
            return (<div key={asteroid.id}>{asteroid.name}</div>)
        })}
    </div>
  )
}

export default FavoriteAsteroids