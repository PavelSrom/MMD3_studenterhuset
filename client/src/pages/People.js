import React, { useState, Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { getAllProfiles } from '../store/actions/profile'

import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import Person from '../components/People/Person'

import classes from './People.module.css'

const People = ({ profiles, getAllProfiles }) => {
  useEffect(() => {
    getAllProfiles()
  }, [])

  const [input, setInput] = useState('')

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

        {profiles
          .filter(
            profile =>
              profile.firstName.startsWith(input) ||
              profile.lastName.startsWith(input)
          )
          .map(profile => (
            <Person key={profile._id} profile={profile} />
          ))}
      </div>
      <BottomNav />
    </Fragment>
  )
}

const mapStateToProps = state => ({
  profiles: state.profile.profiles
})

export default connect(mapStateToProps, { getAllProfiles })(People)
