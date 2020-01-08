import React, { Fragment, useState } from 'react'
import WithGradient from '../../hoc/WithGradient'
import classes from './Close.module.css'

const Beer = () => {
  const [steps] = useState([
    {
      headline: 'Cleanup',
      description:
        'Clean all flat areas in the bar, by the counter, beer taps, coffee machine etc.'
    },
    {
      headline: 'Trash',
      description: 'Take out the trash and put new bags in the trash bucket.'
    },
    {
      headline: 'Inventory',
      description: 'Do the cash inventory and depozit it.'
    },
    {
      headline: 'Final check',
      description:
        'Do the closing round, make sure all exterior doors are properly locked and turn off all lights.'
    },
    {
      headline: 'Leave',
      description: 'Set the alarm and lock the front door.'
    },
    {
      headline: 'Return the card',
      description: 'Deposit the closing card in the mail box.'
    }
  ])
  const [currStep, setCurrStep] = useState(0)

  return (
    <Fragment>
      <div className={classes.header}>
        <WithGradient thin blue style={{ marginRight: 10 }}>
          <i className="fas fa-key"></i>
        </WithGradient>
        <h6>How-to-close list</h6>
      </div>

      <div className={classes.imgBox}>
        {/* src={require(...)} is a way of rendering images dynamically */}
        <img
          className={classes.img}
          src={require(`../../utils/tutorials/close${currStep + 1}.jpg`)}
        />

        {/* fixed step indicator on the left side */}
        <div className={classes.stepBox}>
          {steps.map((step, index) =>
            // if the index is equal to the currently chosen step,
            // we make the background yellow with the 'style' prop
            // otherwise, it's grey
            index === currStep ? (
              <div
                key={index}
                className={classes.stepNumber}
                onClick={() => setCurrStep(index)}
                style={{ background: '#ffbf26' }}
              >
                <p>{index + 1}</p>
              </div>
            ) : (
              <div
                key={index}
                className={classes.stepNumber}
                onClick={() => setCurrStep(index)}
              >
                <p>{index + 1}</p>
              </div>
            )
          )}
        </div>
      </div>

      {/* additional description for images */}
      <div className={classes.text}>
        <h5>
          {currStep + 1}. {steps[currStep].headline}
        </h5>
        <p>{steps[currStep].description}</p>
      </div>
    </Fragment>
  )
}

export default Beer
