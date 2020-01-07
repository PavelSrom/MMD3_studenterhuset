import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom' // router components
import { connect } from 'react-redux' // helper function for connecting the component to Redux
import PrivateRoute from './hoc/PrivateRoute' // our custom HOC that checks auth status
import { loadUser } from './store/actions/auth'

// importing our app pages
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Information from './pages/Information'
import People from './pages/People'
import MyProfile from './pages/MyProfile'
import UpdateProfile from './pages/UpdateProfile'
import CreateProfile from './pages/CreateProfile'
import Posts from './pages/Posts'
import UserProfile from './pages/UserProfile'

const App = ({ loadUser }) => {
  useEffect(() => {
    // as soon as the app is loaded, we wanna load the user
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
        <PrivateRoute exact path="/me/create" component={CreateProfile} />
        <PrivateRoute exact path="/me/update" component={UpdateProfile} />
        <PrivateRoute exact path="/people/:id" component={UserProfile} />
        <PrivateRoute exact path="/posts" component={Posts} />
      </Switch>
    </Router>
  )
}

export default connect(null, { loadUser })(App)
