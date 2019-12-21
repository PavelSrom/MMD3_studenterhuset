import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import PrivateRoute from './hoc/PrivateRoute'
import { loadUser } from './store/actions/auth'

const App = () => {
  useEffect(() => {
    loadUser()
  }, [])

  return (
    <div>
      <h1>Hello world</h1>
    </div>
  )
}

export default connect(null, { loadUser })(App)
