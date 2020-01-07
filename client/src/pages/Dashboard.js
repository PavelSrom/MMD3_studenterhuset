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

// destructuring a loooot of props
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
    getAllProfiles() // get all profiles as soon as Dashboard loads
    getAllAnnouncements() // same for this
    getTodayEvents() // same for this
  }, [isPresent]) // re-render the Dashboard only if 'isPresent' changes

  const featuredProfiles = profiles.filter(profile => profile.isFeatured)
  const peoplePresent = profiles.filter(profile => profile.isPresent)

  return (
    <Fragment>
      <Header />
      <div className="container">
        {/* volunteers of the month stuff */}
        <h4 className="heading">Volunteers of the month</h4>
        {/* if there are any people featured, we show them. otherwise we show a paragraph */}
        {featuredProfiles.length > 0 ? (
          <FeaturedList featuredProfiles={featuredProfiles} />
        ) : (
          <p style={{ textAlign: 'center' }}>No volunteers of the month</p>
        )}

        {/* volunteers in the house stuff */}
        <h4 className="heading">Volunteers in the house</h4>
        {/* if there are any people present, we show them. otherwise we show a paragraph */}
        {peoplePresent.length > 0 ? (
          <Presence peoplePresent={peoplePresent} />
        ) : (
          <p style={{ textAlign: 'center' }}>No people present right now</p>
        )}

        {/* announcements stuff */}
        <h4 className="heading">Announcements</h4>
        {/* if there are any announcements, we show them. otherwise we show a paragraph */}
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
        {/* if there are any events for today, we show them. otherwise we show a paragraph */}
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
/* mapStateToProps defines what we want to get from Redux, and where it's located.
We can then use these as props. Example below: "Give me the 'profiles' array.
It's in the app-level state, in 'profile' reducer, set as 'profiles' property." */
const mapStateToProps = state => ({
  profiles: state.profile.profiles,
  announcements: state.announcement.announcements,
  todayEvents: state.event.todayEvents,
  isPresent: state.profile.myProfile.isPresent
})
/* connecting the component to Redux happens through this 'connect' function. It
takes up to two arguments, the first always being either null (if we don't need to
get anything from Redux), or mapStateToProps. If we want to send any actions to
Redux, we put them into an object and provide that object as a second argument. Just
like mapStateToProps allows, we can then use these actions as component props. */
export default connect(mapStateToProps, {
  getAllProfiles,
  getAllAnnouncements,
  getTodayEvents
})(Dashboard)
