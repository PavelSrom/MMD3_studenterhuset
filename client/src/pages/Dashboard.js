import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { getAllProfiles } from '../store/actions/profile'
import { getTodayEvents } from '../store/actions/event'
import { getAllAnnouncements } from '../store/actions/announcement'

import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import FeaturedList from '../components/Dashboard/FeaturedList'
import Presence from '../components/Dashboard/Presence'
import Announcement from '../components/Dashboard/Announcement'

const Dashboard = ({
  getAllProfiles,
  getAllAnnouncements,
  getTodayEvents,
  profiles,
  announcements,
  todayEvents,
  isPresent
}) => {
  useEffect(() => {
    getAllProfiles()
    getAllAnnouncements()
    getTodayEvents()
  }, [isPresent])

  const featuredProfiles = profiles.filter(profile => profile.isFeatured)
  const peoplePresent = profiles.filter(profile => profile.isPresent)

  return (
    <Fragment>
      <Header />
      <div className="container">
        {/* volunteers of the month stuff */}
        <h4 className="heading">Volunteers of the month</h4>
        {featuredProfiles.length > 0 ? (
          <FeaturedList featuredProfiles={featuredProfiles} />
        ) : (
          <p style={{ textAlign: 'center' }}>No volunteers of the month</p>
        )}

        {/* volunteers in the house stuff */}
        <h4 className="heading">Volunteers in the house</h4>
        {peoplePresent.length > 0 ? (
          <Presence peoplePresent={peoplePresent} />
        ) : (
          <p style={{ textAlign: 'center' }}>No people present right now</p>
        )}

        {/* announcements stuff */}
        <h4 className="heading">Announcements</h4>
        {announcements.length > 0 ? (
          <Fragment>
            {announcements.map(ann => (
              <Announcement key={ann._id} announcement={ann} />
            ))}
          </Fragment>
        ) : (
          <p style={{ textAlign: 'center' }}>No announcements for now</p>
        )}

        {/* today events stuff */}
        <h4 className="heading">Events for today</h4>
        {todayEvents.length > 0 ? (
          <Fragment>
            {todayEvents.map(event => (
              <p>{event}</p>
            ))}
          </Fragment>
        ) : (
          <p style={{ textAlign: 'center' }}>No events for today</p>
        )}
      </div>
      <BottomNav />
    </Fragment>
  )
}

const mapStateToProps = state => ({
  profiles: state.profile.profiles,
  announcements: state.announcement.announcements,
  todayEvents: state.event.todayEvents,
  isPresent: state.profile.myProfile.isPresent
})

export default connect(mapStateToProps, {
  getAllProfiles,
  getAllAnnouncements,
  getTodayEvents
})(Dashboard)
