import React from 'react'
import { NavLink } from 'react-router-dom'

import classes from './BottomNav.module.css'

const BottomNav = () => {
  const iconStyle = {
    fontSize: 36
  }

  return (
    <div className={classes.nav}>
      <NavLink to="/dashboard">
        <i className="fas fa-home" style={iconStyle}></i>
      </NavLink>
      <NavLink to="/info">
        <i className="fas fa-info" style={iconStyle}></i>
      </NavLink>
      <NavLink to="/people">
        <i className="fas fa-user-friends" style={iconStyle}></i>
      </NavLink>
      <NavLink to="/me">
        <i className="fas fa-user" style={iconStyle}></i>
      </NavLink>
      <NavLink to="/posts">
        <i className="fas fa-comment-alt" style={iconStyle}></i>
      </NavLink>
    </div>
  )
}

export default BottomNav
