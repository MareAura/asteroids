import React from 'react'
import { Link } from 'react-router-dom'
import logo from './assets/logo.png'
import comet from './assets/comet.png'

function Navbar() {
  return (
    <div className='navbar-wrapper'>
      <div className='navbar'>
        <Link to={`/`}>
          <img src={logo} alt='logo' className='logo'/>
        </Link>
        <Link to={`/favorite`}>
          <div className='navbar-favorite-btn tooltip'>
            <span className='tooltiptext'> Favorite asteroids</span>
            <img src={comet} alt='favorite asteroids' className='navbar-favorite-btn-icon'/></div>
        </Link>
      </div>
    </div>

  )
}

export default Navbar