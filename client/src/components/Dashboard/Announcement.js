import React from 'react'
import classes from './Announcement.module.css'

const Announcement = ({ announcement }) => (
  <div className={classes.announcement}>
    <div className={classes.annText}>
      <p>{announcement.text}</p>
    </div>
    <p className={classes.annInfo}>
      Author: {announcement.firstName} {announcement.lastName}
    </p>
  </div>
)

export default Announcement
