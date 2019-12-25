import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import PrivateRoute from './hoc/PrivateRoute'
import { loadUser } from './store/actions/auth'

import Home from './pages/Home'
import Login from './pages/Login'
import MyProfile from './pages/MyProfile'

const App = ({ loadUser }) => {
  useEffect(() => {
    loadUser()
  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/me" component={MyProfile} />
      </Switch>
    </Router>
  )
}

export default connect(null, { loadUser })(App)
