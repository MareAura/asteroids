import { useEffect, useState } from 'react';
import axios from "axios";
import './App.css'

function App() {

  const [asteroidsData, setAsteroidsData] = useState({})

  useEffect(() => {
    axios
            .get(
                `https://www.neowsapp.com/rest/v1/feed/today?api_key=3O93YcjVXfreFogJawULO4fHalcOlw8GYPn9BVut`
            )
            .then((response) => {
                const data = response.data;
                setAsteroidsData(data);
            });
  }, [])

  let asteroidsList;

  if (asteroidsData.near_earth_objects) {
    
    const nearEarthObjects = Object.values(asteroidsData.near_earth_objects)[0]

    asteroidsList = nearEarthObjects.map((asteroid) => 
        <div className='asteroid-card' key={asteroid.id}>
          <div>{asteroid.close_approach_data[0].close_approach_date_full}</div>
          <div>Name: {asteroid.name.slice(1, asteroid.name.length - 1)}</div>
          <div>Distance: {asteroid.close_approach_data[0].miss_distance.kilometers.split('.')[0]} km</div>
          <div>Distance: {asteroid.close_approach_data[0].miss_distance.lunar.split('.')[0]} lunar</div>
          <div>Diametr: {String(asteroid.estimated_diameter.meters.estimated_diameter_max).split('.')[0]} meters</div>
          {asteroid.is_potentially_hazardous_asteroid ? <div>Dangerous!</div> : <div>Not dangerous</div>}
        </div>
        )

    console.log(nearEarthObjects)
  }

  return (

    asteroidsData && <div className='asteroids-list'>{asteroidsList}</div>
  )
}

export default App
