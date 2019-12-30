import React from 'react'
import classes from './Presence.module.css'

const Presence = ({ peoplePresent }) => {
  return (
    <div className={classes.presenceBox}>
      {peoplePresent.map(person => (
        <div key={person._id} className={classes.person}>
          <div className={classes.avatar}></div>
          <p>{`${person.firstName}`}</p>
        </div>
      ))}
    </div>
  )
}

export default Presence
