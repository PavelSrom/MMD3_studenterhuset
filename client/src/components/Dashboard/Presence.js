import React from 'react'
import classes from './Presence.module.css'

const Presence = ({ peoplePresent }) => (
  <div className={classes.presenceBox}>
    {/* looping through the peoplePresent array and outputting each person */}
    {peoplePresent.map(person => (
      <div key={person._id} className={classes.person}>
        <div className={classes.avatar}></div>
        <p>{`${person.firstName}`}</p>
      </div>
    ))}
  </div>
)

export default Presence
