import React, { Fragment, useState } from 'react'
import classes from './Beer.module.css'

const Beer = () => {
  // note that when you don't need a state-setting function (e.g. in this case),
  // you don't have to destructure it
  const [steps] = useState([
    {
      headline: 'Choose the appropriate beer',
      description: 'The number should be the same as on the beer in the bar.'
    },
    {
      headline: 'Step 2',
      description: 'This is step two'
    },
    {
      headline: 'Step 3',
      description: 'This is step three'
    }
  ])
  // to know what step we should be currently on
  const [currStep, setCurrStep] = useState(0)

  return (
    <Fragment>
      <div className={classes.header}>
        <i className="fas fa-beer"></i>
        <h6>Changing the beer</h6>
      </div>

      <div className={classes.imgBox}>
        {/* src={require(...)} is a way of rendering images dynamically */}
        <img
          className={classes.img}
          src={require(`../../utils/tutorials/placeholder${currStep + 1}.png`)}
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
        <h5>{steps[currStep].headline}</h5>
        <p>{steps[currStep].description}</p>
      </div>
    </Fragment>
  )
}

export default Beer
