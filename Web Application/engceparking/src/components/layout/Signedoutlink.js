import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
  return (
    <div>
      <ul className="right">
        <li><NavLink style={{  color: 'black'}} to='/signup'>Signup</NavLink></li>
        <li><NavLink style={{  color: 'black'}} to='/signin'>Login</NavLink></li>
        <li><NavLink style={{  color: 'black'}} to='/empty'>Parking</NavLink></li>
      </ul>
    </div>
  )
}

export default SignedOutLinks