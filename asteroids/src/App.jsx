import './App.css'
import AsteroidPage from './AsteroidPage';
import { Routes, Route } from 'react-router-dom'
import AsteroidsList from './AsteroidsList';
import Navbar from './Navbar';
import FavoriteAsteroids from './FavoriteAsteroids';

function App() {

  return (
    <div>
      <Navbar/>
      <Routes>
          <Route path='/' element={<AsteroidsList />}/>
          <Route path='/:asteroidId' element={<AsteroidPage />}/>
          <Route path='/favorite' element={<FavoriteAsteroids/>}/>
      </Routes>
    </div>
  )
}

export default App
