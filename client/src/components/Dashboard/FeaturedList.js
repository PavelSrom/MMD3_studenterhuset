import React from 'react'
import classes from './FeaturedList.module.css'

const FeaturedList = ({ featuredProfiles }) => (
  <div className={classes.featuredBox}>
    {featuredProfiles.map(profile => (
      <div key={profile._id} className={classes.profileBox}>
        <div className={classes.avatar}>
          <p>{`${profile.firstName[0]}${profile.lastName[0]}`}</p>
        </div>
        <p className={classes.name}>
          {profile.firstName} {profile.lastName}
        </p>
      </div>
    ))}
  </div>
)

export default FeaturedList
