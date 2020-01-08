import React, { Fragment, useState } from 'react'
import WithGradient from '../../hoc/WithGradient'
import classes from './Beer.module.css'

const Beer = () => {
  // note that when you don't need a state-setting function (e.g. in this case),
  // you don't have to destructure it
  const [steps] = useState([
    {
      headline: 'Find the number',
      description: 'Check the number of the beer that you need to change.'
    },
    {
      headline: 'Go to the pavement',
      description:
        'Find the same number on a beer container in the pavement. Press the button below the handle and turn it to the right. Then move the container to the area with the empty ones.'
    },
    {
      headline: 'Find the container',
      description:
        'Find the accurate container within the ones that stand next to the wall on the left. Bring it, open it and put the handle into the container. Then press the button again and turn the handle to the left.'
    },
    {
      headline: 'Open the shelf',
      description:
        'Open the metal shelf above all the containers and find the matching number (the one that you’re looking for should be empty). Press the white bottle top until the vial is full. Then press the black one, so the ball goes up.'
    },
    {
      headline: 'Mission accomplished',
      description: "You're done! Good job!"
    }
  ])
  // to know what step we should be currently on
  const [currStep, setCurrStep] = useState(0)

  return (
    <Fragment>
      <div className={classes.header}>
        <WithGradient thin blue style={{ marginRight: 10 }}>
          <i className="fas fa-beer"></i>
        </WithGradient>
        <h6>Changing the beer</h6>
      </div>

      <div className={classes.imgBox}>
        {/* src={require(...)} is a way of rendering images dynamically */}
        <img
          className={classes.img}
          src={require(`../../utils/tutorials/beer${currStep + 1}.jpg`)}
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
