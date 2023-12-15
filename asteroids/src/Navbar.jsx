import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='navbar'>
        <Link to={`/`}>Main page</Link>
        <Link to={`/favorite`}>Favorite Asteroids</Link>
    </div>

  )
}

export default Navbar