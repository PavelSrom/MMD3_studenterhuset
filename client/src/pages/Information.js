import React, { Fragment, useState } from 'react'

import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import Beer from '../components/Information/Beer'
import Close from '../components/Information/Close'
import Ask from '../components/Information/Ask'
import Rules from '../components/Information/Rules'

import classes from './Information.module.css'

const Information = () => {
  // to know which section we should display ('beer' by default)
  const [selectedInfo, setSelectedInfo] = useState('beer')

  return (
    <Fragment>
      <Header />
      <div className="container">
        <div className={classes.infoPageBox}>
          <i
            onClick={() => setSelectedInfo('beer')}
            className="fas fa-beer"
          ></i>
          <i
            onClick={() => setSelectedInfo('close')}
            className="fas fa-key"
          ></i>
          <i
            onClick={() => setSelectedInfo('ask')}
            className="fas fa-comment"
          ></i>
          <i
            onClick={() => setSelectedInfo('rules')}
            className="fas fa-question-circle"
          ></i>
        </div>
        {/* displaying the correct section based on our state */}
        {selectedInfo === 'beer' && <Beer />}
        {selectedInfo === 'close' && <Close />}
        {selectedInfo === 'ask' && <Ask />}
        {selectedInfo === 'rules' && <Rules />}
      </div>
      <BottomNav />
    </Fragment>
  )
}

export default Information
