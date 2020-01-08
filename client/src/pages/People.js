import React, { useState, Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { getAllProfiles } from '../store/actions/profile'

import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import Person from '../components/People/Person'
import WithGradient from '../hoc/WithGradient'

import classes from './People.module.css'

const People = ({ profiles, getAllProfiles }) => {
  useEffect(() => {
    getAllProfiles() // server request as soon as the page loads
  }, [])

  // to know who are we searching for
  const [input, setInput] = useState('')
  const [roles] = useState([
    {
      iconClass: 'fas fa-cocktail',
      role: 'bar'
    },
    {
      iconClass: 'fas fa-lightbulb',
      role: 'lights'
    },
    {
      iconClass: 'fas fa-music',
      role: 'music'
    },
    {
      iconClass: 'fas fa-comments',
      role: 'marketing'
    }
  ])

  return (
    <Fragment>
      <Header />
      <div className="container">
        <h4 className="heading">Volunteers list</h4>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Search for a volunteer..."
          className={classes.input}
        />

        <div className={classes.flex}>
          {roles.map((role, index) =>
            input === role.role ? (
              <div
                key={index}
                className={classes.roleBox}
                onClick={() => setInput(role.role)}
              >
                <WithGradient thin yellow>
                  <div className={classes.roleAvatar}>
                    <i className={role.iconClass}></i>
                  </div>
                </WithGradient>
                <h6 className={classes.roleName}>{role.role}</h6>
              </div>
            ) : (
              <div
                key={index}
                className={classes.roleBox}
                onClick={() => setInput(role.role)}
              >
                <WithGradient thin blue>
                  <div className={classes.roleAvatar}>
                    <i className={role.iconClass}></i>
                  </div>
                </WithGradient>

                <h6 className={classes.roleName}>{role.role}</h6>
              </div>
            )
          )}
        </div>

        {/* showing the filtered list based on user input */}
        {/* and outputting each user as a <Person /> component */}
        {profiles
          .filter(
            profile =>
              profile.firstName.startsWith(input) ||
              profile.lastName.startsWith(input) ||
              profile.role === input
          )
          .map(profile => (
            <Person key={profile._id} profile={profile} />
          ))}
      </div>
      <BottomNav />
    </Fragment>
  )
}

// getting the people from Redux
const mapStateToProps = state => ({
  profiles: state.profile.profiles
})

export default connect(mapStateToProps, { getAllProfiles })(People)
