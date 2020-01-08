import React, { useState } from 'react'
import WithGradient from '../../hoc/WithGradient'
import Popup from '../Information/Popup'
import classes from './Presence.module.css'

const Presence = ({ peoplePresent }) => {
  const [popupOpen, setPopupOpen] = useState(false)
  const [chosenPerson, setChosenPerson] = useState(null)

  return (
    <div className={classes.presenceBox}>
      {/* looping through the peoplePresent array and outputting each person */}
      {peoplePresent.map(person => (
        <div
          key={person._id}
          className={classes.person}
          onClick={() => {
            setChosenPerson(person)
            setPopupOpen(true)
          }}
        >
          <WithGradient yellow thin>
            <div className={classes.avatar}></div>
          </WithGradient>
          <p>{`${person.firstName}`}</p>
        </div>
      ))}

      {popupOpen && <Popup setPopupOpen={setPopupOpen} person={chosenPerson} />}
    </div>
  )
}

export default Presence
