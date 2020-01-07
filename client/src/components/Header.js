import React, { useState } from 'react'
import { connect } from 'react-redux'
import { updateProfile } from '../store/actions/profile'

import classes from './Header.module.css'

const Header = ({ updateProfile, isPresent: presence }) => {
  const [isPresent, setIsPresent] = useState(false)

  // this function runs when the checkbox value is changed
  const sendPresence = () => {
    setIsPresent(!isPresent) // set presence to the opposite value
    updateProfile({ isPresent: !isPresent }) // request to the server
  }

  return (
    <div className={classes.header}>
      <p style={{ marginRight: 10, marginBottom: 0 }}>Present in the house</p>
      <input
        type="checkbox"
        onChange={sendPresence}
        checked={presence}
        className={classes.checkbox}
      />
    </div>
  )
}

const mapStateToProps = state => ({
  isPresent: state.profile.myProfile.isPresent
})

export default connect(mapStateToProps, { updateProfile })(Header)
