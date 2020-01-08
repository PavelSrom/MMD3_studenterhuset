import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'

import classes from './BottomNav.module.css'

// console.log(location.pathname) to see what's going on here
const BottomNav = ({ location }) => {
  // having links and their icons in our state
  const [links] = useState([
    {
      link: '/dashboard',
      icon: 'fas fa-home'
    },
    {
      link: '/info',
      icon: 'fas fa-info'
    },
    {
      link: '/people',
      icon: 'fas fa-user-friends'
    },
    {
      link: '/me',
      icon: 'fas fa-user'
    },
    {
      link: '/posts',
      icon: 'fas fa-comment-alt'
    }
  ])

  const defaultStyle = {
    fontSize: 36,
    color: '#5c75b0'
  }

  const activeStyle = {
    fontSize: 36,
    color: '#ffbf26'
  }

  return (
    <div className={classes.nav}>
      {links.map(link =>
        // if the link is the same as the page we're currently on,
        // we want to make the icon yellow (we're changing the 'style' prop)
        link.link === location.pathname ? (
          <Link to={link.link} key={link.link}>
            <i className={link.icon} style={activeStyle}></i>
          </Link>
        ) : (
          <Link to={link.link} key={link.link}>
            <i className={link.icon} style={defaultStyle}></i>
          </Link>
        )
      )}
    </div>
  )
}

// giving this component access to routing-related props
export default withRouter(BottomNav)
