import './App.css'
import AsteroidPage from './AsteroidPage';
import { Routes, Route } from 'react-router-dom'
import AsteroidsList from './AsteroidsList';
import Navbar from './Navbar';

function App() {

  return (
    <div>
      <Navbar/>
      <Routes>
          <Route path='/' element={<AsteroidsList />}/>
          <Route path='/:asteroidId' element={<AsteroidPage />}/>
      </Routes>
    </div>
  )
}

export default App
