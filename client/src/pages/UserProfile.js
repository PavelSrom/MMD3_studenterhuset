import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getProfileById } from '../store/actions/profile'

import Header from '../components/Header'
import BottomNav from '../components/BottomNav'

import classes from './UserProfile.module.css'
import WithGradient from '../hoc/WithGradient'
import Popup from '../components/Information/Popup'

const UserProfile = ({ match, userProfile, getProfileById }) => {
  useEffect(() => {
    getProfileById(match.params.id) // request for getting user's profile by id
  }, [])

  const [popupOpen, setPopupOpen] = useState(false)

  return (
    <Fragment>
      <Header />
      <div className="container">
        {!userProfile.requestSent ? (
          <p>Loading...</p>
        ) : (
          <Fragment>
            <div style={{ width: 'fit-content', margin: '40px auto 0 auto' }}>
              <WithGradient yellow>
                <div
                  className={classes.avatar}
                  onClick={() => setPopupOpen(true)}
                >
                  <i className="fas fa-user"></i>
                </div>
              </WithGradient>
            </div>
            <h4 style={{ textAlign: 'center', marginTop: 20 }}>
              {userProfile.firstName} {userProfile.lastName}
            </h4>
            {userProfile.isPresent && (
              <p style={{ textAlign: 'center' }}>Online</p>
            )}

            <div className={classes.moreInfo}>
              <div className={classes.moreInfoSection}>
                <WithGradient thin blue>
                  <div className={classes.iconAvatar}>
                    <i className="fas fa-cocktail"></i>
                  </div>
                </WithGradient>
                <h5 style={{ textTransform: 'capitalize' }}>
                  {userProfile.role}
                </h5>
              </div>
              {!userProfile.requestSent && <p>Loading...</p>}
              {userProfile.requestSent && (
                <Fragment>
                  <div className={classes.moreInfoSection}>
                    <WithGradient thin blue>
                      <div className={classes.iconAvatar}>
                        <i className="fas fa-puzzle-piece"></i>
                      </div>
                    </WithGradient>
                    <h5>Interests</h5>
                  </div>
                  <p style={{ marginLeft: 105 }}>
                    {userProfile.interests.join(', ')}
                  </p>
                </Fragment>
              )}
            </div>
          </Fragment>
        )}

        {popupOpen && (
          <Popup person={userProfile} setPopupOpen={setPopupOpen} />
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
