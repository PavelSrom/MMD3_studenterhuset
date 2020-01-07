import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

// custom higher-order component that checks user's auth status
// in case the user isn't authenticated, it redirects them to login page
// otherwise, it lets them continue to wherever they want to go

// '...rest' is the rest of the props that are being passed in
// this could be for example 'exact', 'path' etc.
const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
)
// note that we're renaming 'component' to 'Component' - that is to make React know
// that it should render a component, not a native HTML element
// components must always be capitalized in the markup

// extracting auth status from Redux
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(PrivateRoute)
