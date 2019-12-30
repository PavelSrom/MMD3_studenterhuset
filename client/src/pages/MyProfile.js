import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getMyProfile } from '../store/actions/profile'

import Header from '../components/Header'
import BottomNav from '../components/BottomNav'

import classes from './MyProfile.module.css'

const MyProfile = ({ getMyProfile, myProfile }) => {
  useEffect(() => {
    getMyProfile()
  }, [])

  return (
    <Fragment>
      <Header />
      <div className="container">
        {!myProfile.requestSent ? (
          <p>Loading profile...</p>
        ) : (
          <Fragment>
            <div className={classes.avatar}>
              <i className="fas fa-user"></i>
            </div>
            <h4 style={{ textAlign: 'center', marginTop: 20 }}>
              {myProfile.firstName} {myProfile.lastName}
            </h4>

            <div className={classes.moreInfo}>
              <h5>Role</h5>
              <p>{myProfile.role}</p>
              <h5>Interests</h5>
              {!myProfile.requestSent && <p>Loading...</p>}
              {myProfile.requestSent && <p>{myProfile.interests.join(', ')}</p>}
            </div>

            <Link to="/me/update">
              <button className="button" style={{ marginTop: 40 }}>
                Update profile
              </button>
            </Link>
          </Fragment>
        )}
      </div>
      <BottomNav />
    </Fragment>
  )
}

const mapStateToProps = state => ({
  myProfile: state.profile.myProfile
})

export default connect(mapStateToProps, { getMyProfile })(MyProfile)
