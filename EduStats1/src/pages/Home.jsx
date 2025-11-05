import React from 'react'
import { NavLink } from 'react-router-dom'
export default function () {
  return (
    <div>
        <NavLink to="/signup">Signup</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/Aboutus">Aboutus</NavLink>
    </div>
  )
}
