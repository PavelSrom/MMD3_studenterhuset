import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import PrivateRoute from './hoc/PrivateRoute'
import { loadUser } from './store/actions/auth'

import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Information from './pages/Information'
import People from './pages/People'
import MyProfile from './pages/MyProfile'
import UpdateProfile from './pages/UpdateProfile'
import Posts from './pages/Posts'
import UserProfile from './pages/UserProfile'

const App = ({ loadUser }) => {
  useEffect(() => {
    // this condition may be buggy
    if (localStorage.token) loadUser()
  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/info" component={Information} />
        <PrivateRoute exact path="/people" component={People} />
        <PrivateRoute exact path="/me" component={MyProfile} />
        <PrivateRoute exact path="/me/update" component={UpdateProfile} />
        <PrivateRoute exact path="/people/:id" component={UserProfile} />
        <PrivateRoute exact path="/posts" component={Posts} />
      </Switch>
    </Router>
  )
}

export default connect(null, { loadUser })(App)
