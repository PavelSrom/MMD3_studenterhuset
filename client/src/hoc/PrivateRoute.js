import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

// custom higher-order component that checks user's auth status
// in case the user isn't authenticated, it redirects them to login page
// otherwise, it lets them continue to wherever they want to go
const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
)

// extracting auth status from Redux
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(PrivateRoute)
