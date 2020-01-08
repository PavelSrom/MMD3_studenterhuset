import React, { Fragment, useState } from 'react'
import Popup from './Popup'
import WithGradient from '../../hoc/WithGradient'
import classes from './Ask.module.css'

const Ask = () => {
  // to know when the popup should be open
  const [popupOpen, setPopupOpen] = useState(false)
  // to know what person name to display in the popup
  const [chosenPerson, setChosenPerson] = useState(null)
  // self-explanatory
  const [peopleToContact] = useState([
    {
      fullName: 'Mathias Jensen',
      position: 'manager',
      phoneNumber: '+4512345678',
      messenger: 'some messenger'
    },
    {
      fullName: 'Pavel Srom',
      position: 'manager',
      phoneNumber: '1234 5678'
    },
    {
      fullName: 'Olga Flegel',
      position: 'manager',
      messenger: 'another messenger'
    },
    {
      fullName: 'Kinga Toth',
      position: 'manager'
    }
  ])

  const handleChosenPerson = index => {
    setChosenPerson(peopleToContact[index])
    setPopupOpen(true)
  }

  return (
    <Fragment>
      <div className={classes.header}>
        <WithGradient thin blue style={{ marginRight: 10 }}>
          <i className="fas fa-comment"></i>
        </WithGradient>
        <h6>List of people to contact</h6>
      </div>

      {peopleToContact.map((person, index) => (
        <div
          onClick={() => handleChosenPerson(index)}
          key={index}
          className={classes.personBox}
        >
          <WithGradient blue style={{ marginRight: 15 }}>
            <div className={classes.personAvatar}></div>
          </WithGradient>
          <h6>
            {person.fullName} - {person.position}
          </h6>
        </div>
      ))}

      {popupOpen && <Popup person={chosenPerson} setPopupOpen={setPopupOpen} />}
    </Fragment>
  )
}

export default Ask
