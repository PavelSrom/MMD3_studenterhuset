import React from 'react'
import classes from './Popup.module.css'

const Popup = ({ person, setPopupOpen }) => (
  <div className={classes.overlay}>
    <div className={classes.content}>
      <div className={classes.crossWrapper}>
        <i className="fas fa-times" onClick={() => setPopupOpen(false)}></i>
      </div>
      <h5>Contact {person.fullName}</h5>
      <div className={classes.iconBox}>
        {!person.phoneNumber && !person.messenger && (
          <p>This person didn't provide contact info</p>
        )}
        {person.messenger && (
          <a href={person.messenger} target="_blank">
            <i className="fab fa-facebook-messenger"></i>
          </a>
        )}
        {person.phoneNumber && (
          <a href={person.phoneNumber} target="_blank">
            <i className="fas fa-phone"></i>
          </a>
        )}
      </div>
    </div>
  </div>
)

export default Popup
