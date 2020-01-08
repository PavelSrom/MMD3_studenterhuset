import React from 'react'
import WithGradient from '../../hoc/WithGradient'
import classes from './Popup.module.css'

const Popup = ({ person, setPopupOpen }) => (
  <div className={classes.overlay}>
    <div className={classes.content}>
      <div className={classes.crossWrapper}>
        <i className="fas fa-times" onClick={() => setPopupOpen(false)}></i>
      </div>
      <h5>Contact {person.fullName || person.firstName}</h5>
      <div className={classes.iconBox}>
        {!person.phoneNumber && !person.messenger && (
          <p>This person didn't provide contact info</p>
        )}
        {person.messenger && (
          <a href={person.messenger} target="_blank">
            <WithGradient yellow style={{ margin: 10 }}>
              <i className="fab fa-facebook-messenger"></i>
            </WithGradient>
          </a>
        )}
        {person.phoneNumber && (
          <a href={`tel:${person.phoneNumber}`} target="_blank">
            <WithGradient yellow style={{ margin: 10 }}>
              <i className="fas fa-phone"></i>
            </WithGradient>
          </a>
        )}
      </div>
    </div>
  </div>
)

export default Popup
