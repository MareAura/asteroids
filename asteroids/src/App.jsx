import './App.css'
import { useState } from 'react';
import AsteroidPage from './AsteroidPage';
import { Routes, Route } from 'react-router-dom'
import AsteroidsList from './AsteroidsList';
import Navbar from './Navbar';
import FavoriteAsteroids from './FavoriteAsteroids';

function App() {

  const [favoriteAsteroids, setFavoriteAsteroids] = useState([])

  const addFavorite = (asteroid) => {
    setFavoriteAsteroids([...favoriteAsteroids, asteroid]);
  };

  console.log(favoriteAsteroids)

  return (
    <div>
      <Navbar/>
      <Routes>
          <Route path='/' element={<AsteroidsList addFavorite={addFavorite}/>}/>
          <Route path='/:asteroidId' element={<AsteroidPage />}/>
          <Route path='/favorite' element={<FavoriteAsteroids favorite={favoriteAsteroids}/>}/>
      </Routes>
    </div>
  )
}

export default App
