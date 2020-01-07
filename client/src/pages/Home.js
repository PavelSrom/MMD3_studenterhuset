import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../utils/studenthouse.svg'
import './Home.css'

const Home = () => (
  <div className="gradient">
    <div className="height-fixed">
      <img src={logo} alt="" className="logo-center" />
      <h3 className="text-center mt-2">Studenterhuset</h3>
    </div>
    <div className="text-center flex">
      <p style={{ fontSize: 18 }}>
        Welcome to the Student House's volunteers society!
        <br />
        You're just about to start an amazing adventure.
      </p>
      <Link to="/login" className="button bg-lightyellow">
        Sign in
      </Link>
    </div>
  </div>
)

export default Home
