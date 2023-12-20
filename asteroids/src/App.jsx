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
    if (favoriteAsteroids) {
      setFavoriteAsteroids(favoriteAsteroids);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteAsteroids', JSON.stringify(favoriteAsteroids));
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
      <div className='main-content'>
      <Routes>
          <Route path='/' element={<AsteroidsList addFavorite={addFavorite} removeFavorite={removeFavorite} favorite={favoriteAsteroids}/>}/>
          <Route path='/:asteroidId' element={<AsteroidPage />}/>
          <Route path='/favorite' element={<FavoriteAsteroids favorite={favoriteAsteroids} removeFavorite={removeFavorite}/>}/>
      </Routes>
      </div>
    </div>
  )
}

export default App
