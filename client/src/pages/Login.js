import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginUser } from '../store/actions/auth'
import logo from '../utils/studenthouse.svg'
import './Login.css'

const Login = ({ loginUser, isAuthenticated }) => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  // function for handling form data (email + password)
  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value })

  // if the user is authenticated, redirect them to dashboard page
  if (isAuthenticated) return <Redirect to="/dashboard" />

  return (
    <div className="gradient">
      <div className="height-fixed text-center">
        <h4 className="text-white mb-5 heading">Sign in</h4>
        <img
          src={logo}
          alt=""
          className="logo-center"
          style={{ maxWidth: 120 }}
        />
        <h4 className="heading">Studenterhuset</h4>
      </div>
      <div className="flex">
        <div style={{ position: 'relative', bottom: 30 }}>
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            onChange={e => handleChange(e)}
            type="text"
            name="email"
            className="form-control"
            placeholder="Your email..."
          />
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            onChange={e => handleChange(e)}
            type="password"
            name="password"
            className="form-control"
            placeholder="Your password..."
          />
        </div>
        <button
          className="button"
          onClick={() => loginUser(form)}
          disabled={!form.email || !form.password}
        >
          Sign in
        </button>
      </div>
    </div>
  )
}

// extracting auth state from Redux
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { loginUser })(Login)
