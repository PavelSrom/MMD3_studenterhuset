import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { getProfileById } from '../store/actions/profile'

import Header from '../components/Header'
import BottomNav from '../components/BottomNav'

import classes from './UserProfile.module.css'

const UserProfile = ({ match, userProfile, getProfileById }) => {
  useEffect(() => {
    getProfileById(match.params.id)
  }, [])

  return (
    <Fragment>
      <Header />
      <div className="container">
        {!userProfile.requestSent ? (
          <p>Loading...</p>
        ) : (
          <Fragment>
            <div className={classes.avatar}>
              <i className="fas fa-user"></i>
            </div>
            <h4 style={{ textAlign: 'center', marginTop: 20 }}>
              {userProfile.firstName} {userProfile.lastName}
            </h4>
            {userProfile.isPresent && (
              <p style={{ textAlign: 'center' }}>Online</p>
            )}

            <div className={classes.moreInfo}>
              <h5>Role</h5>
              <p>{userProfile.role}</p>
              <h5>Interests</h5>
              {!userProfile.requestSent && <p>Loading...</p>}
              {userProfile.requestSent && (
                <p>{userProfile.interests.join(', ')}</p>
              )}
            </div>
          </Fragment>
        )}
      </div>
      <BottomNav />
    </Fragment>
  )
}

const mapStateToProps = state => ({
  userProfile: state.profile.userProfile
})

export default connect(mapStateToProps, { getProfileById })(UserProfile)
