import React from 'react'
import { Link } from 'react-router-dom'

import classes from './Person.module.css'

const Person = ({ profile }) => {
  const messageStyle = {
    fontSize: 24,
    color: '#5c75b0',
    marginLeft: 'auto'
  }

  return (
    <div className={classes.flex}>
      {/* link to '/people/:id' (:id is dynamically set) */}
      <Link to={`/people/${profile.user}`}>
        <div className={classes.avatar}>
          <i className="fas fa-user darkblue"></i>
        </div>
      </Link>
      <div>
        <h6 style={{ marginBottom: 0 }}>
          {profile.firstName} {profile.lastName}
        </h6>
        <p>{profile.role}</p>
      </div>
      <i className="fas fa-comments" style={messageStyle}></i>
    </div>
  )
}

export default Person
