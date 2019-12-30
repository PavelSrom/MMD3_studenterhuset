import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux'
import { updateProfile } from '../store/actions/profile'

import Header from '../components/Header'
import BottomNav from '../components/BottomNav'

import classes from './UpdateProfile.module.css'

const UpdateProfile = ({ myProfile, updateProfile, history }) => {
  const [role, setRole] = useState('')
  const [interests, setInterests] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (role && interests) {
      console.log('form submitted')
      updateProfile({ role, interests: interests.split(', ') }, history)
    } else {
      console.log('missing data')
    }
  }

  return (
    <Fragment>
      <Header />
      <div className="container">
        <h5 className="heading" style={{ marginBottom: 40 }}>
          Update my profile
        </h5>

        {/* form with inputs for new data */}
        <form onSubmit={handleSubmit} className={classes.form}>
          <p>Role</p>
          <input
            placeholder="New role..."
            type="text"
            value={role}
            onChange={e => setRole(e.target.value)}
          />

          <p>Interests</p>
          <input
            placeholder="Separate by comma and space"
            type="text"
            value={interests}
            onFocus={() => setInterests(myProfile.interests.join(', '))}
            onChange={e => setInterests(e.target.value)}
          />

          <button type="submit" className="button" style={{ marginTop: 40 }}>
            Update
          </button>
        </form>
      </div>
      <BottomNav />
    </Fragment>
  )
}

const mapStateToProps = state => ({
  myProfile: state.profile.myProfile
})

export default connect(mapStateToProps, { updateProfile })(UpdateProfile)
