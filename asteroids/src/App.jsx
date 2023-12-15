import './App.css'
import { useEffect, useState } from 'react';
import AsteroidPage from './AsteroidPage';
import { Routes, Route } from 'react-router-dom'
import AsteroidsList from './AsteroidsList';
import Navbar from './Navbar';
import FavoriteAsteroids from './FavoriteAsteroids';

function App() {

  const [favoriteAsteroids, setFavoriteAsteroids] = useState(JSON.parse(localStorage.getItem('favoriteAsteroids')) || [])

  useEffect(() => {
    const favoriteAsteroids = JSON.parse(localStorage.getItem('favoriteAsteroids'));
    console.log("got from storage", favoriteAsteroids)
    if (favoriteAsteroids) {
      setFavoriteAsteroids(favoriteAsteroids);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteAsteroids', JSON.stringify(favoriteAsteroids));
    console.log('saving', favoriteAsteroids)
  }, [favoriteAsteroids]);



  const addFavorite = (asteroid) => {
    setFavoriteAsteroids([...favoriteAsteroids, asteroid]);
  };

  const removeFavorite = (asteroidId) => {
      const afterRemove = favoriteAsteroids.filter((asteroid) => asteroid.id !== asteroidId)
      setFavoriteAsteroids(afterRemove)
  }

  return (
    <div>
      <Navbar/>
      <Routes>
          <Route path='/' element={<AsteroidsList addFavorite={addFavorite} />}/>
          <Route path='/:asteroidId' element={<AsteroidPage />}/>
          <Route path='/favorite' element={<FavoriteAsteroids favorite={favoriteAsteroids} removeFavorite={removeFavorite}/>}/>
      </Routes>
    </div>
  )
}

export default App
