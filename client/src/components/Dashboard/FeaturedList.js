import React from 'react'
import WithGradient from '../../hoc/WithGradient'
import classes from './FeaturedList.module.css'

const FeaturedList = ({ featuredProfiles }) => (
  <div className={classes.featuredBox}>
    {/* looping through volunteers of the month and outputting them */}
    {featuredProfiles.map(profile => (
      <div key={profile._id} className={classes.profileBox}>
        <WithGradient blue>
          <div className={classes.avatar}>
            <p>{`${profile.firstName[0]}${profile.lastName[0]}`}</p>
          </div>
        </WithGradient>

        <p className={classes.name}>
          {profile.firstName} {profile.lastName}
        </p>
      </div>
    ))}
  </div>
)

export default FeaturedList
