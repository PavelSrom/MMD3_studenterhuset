import React from 'react'
import { Link } from 'react-router-dom'
import WithGradient from '../../hoc/WithGradient'

import classes from './Person.module.css'

const Person = ({ profile: { user, firstName, lastName, role } }) => {
  const userStyle = {
    fontSize: 24,
    color: '#333'
  }

  return (
    <div className={classes.flex}>
      {/* link to '/people/:id' (:id is dynamically set) */}
      <Link to={`/people/${user}`}>
        <WithGradient yellow style={{ marginRight: 20 }}>
          <div className={classes.avatar}>
            <i className="fas fa-user" style={userStyle}></i>
          </div>
        </WithGradient>

        <div className={classes.borderGradient}></div>
      </Link>
      <h6 style={{ marginBottom: 0 }}>
        {firstName} {lastName}
      </h6>

      {/* showing different icons based on the volunteer's role */}
      <WithGradient thin blue style={{ marginLeft: 'auto', marginRight: 16 }}>
        <div className={classes.roleIcon}>
          {role === 'bar' && <i className="fas fa-cocktail"></i>}
          {role === 'lights' && <i className="fas fa-lightbulb"></i>}
          {role === 'music' && <i className="fas fa-music"></i>}
          {role === 'marketing' && <i className="fas fa-comments"></i>}
        </div>
      </WithGradient>
    </div>
  )
}

export default Person
