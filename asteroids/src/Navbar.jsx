import React from 'react'
import { Link } from 'react-router-dom'
import logo from './assets/logo1.png'
import comet from './assets/comet.png'

function Navbar() {
  return (
    <div className='navbar-wrapper'>
      <div className='navbar'>
        <Link to={`/`}>
          <div className='logo-wrapper'>
            <img src={logo} alt='logo' className='logo-icon' title='Main page'/>
            <span className='logo-text'>Asteroid Guard</span>
          </div>
        </Link>
        <Link to={`/favorite`}>
          <div className='navbar-favorite-btn' title='Favorite asteroids'>
            <img src={comet} alt='favorite asteroids' className='navbar-favorite-btn-icon'/></div>
        </Link>
      </div>
    </div>

  )
}

export default Navbar