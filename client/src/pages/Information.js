import React, { Fragment, useState } from 'react'
import WithGradient from '../hoc/WithGradient'

import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import Beer from '../components/Information/Beer'
import Close from '../components/Information/Close'
import Ask from '../components/Information/Ask'
import Rules from '../components/Information/Rules'

import classes from './Information.module.css'

const Information = () => {
  const [sections] = useState([
    {
      name: 'beer',
      icon: 'fas fa-beer'
    },
    {
      name: 'close',
      icon: 'fas fa-key'
    },
    {
      name: 'ask',
      icon: 'fas fa-comment'
    },
    {
      name: 'rules',
      icon: 'fas fa-question-circle'
    }
  ])
  // to know which section we should display ('beer' by default)
  const [selectedInfo, setSelectedInfo] = useState('beer')

  return (
    <Fragment>
      <Header />
      <div className="container">
        <div className={classes.infoPageBox}>
          {/* looping through the sections and outputting each of them */}
          {/* if the section's name is the same as the currently selected section, the border is yellow */}
          {sections.map(section =>
            section.name === selectedInfo ? (
              <WithGradient thin yellow key={section.icon}>
                <i
                  key={section.icon}
                  onClick={() => setSelectedInfo(section.name)}
                  className={section.icon}
                ></i>
              </WithGradient>
            ) : (
              <WithGradient thin blue key={section.icon}>
                <i
                  key={section.icon}
                  onClick={() => setSelectedInfo(section.name)}
                  className={section.icon}
                ></i>
              </WithGradient>
            )
          )}
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
