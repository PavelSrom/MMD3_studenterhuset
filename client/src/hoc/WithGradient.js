import React from 'react'

import classes from './WithGradient.module.css'

// custom higher-order component that adds linear gradient into a child <div>
const WithGradient = ({ children, yellow, blue, thin, style }) => {
  const customStyle = {
    ...style, // merge the style with a new background
    background: 'linear-gradient(45deg, red, blue)',
    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.25)'
  }
  // if these props are provided, we make the gradient look accordingly
  if (blue) customStyle.background = 'linear-gradient(180deg, #5c75b0, #91b2ff)'
  if (yellow) customStyle.background = 'linear-gradient(225deg, #fff, #ffbf26)'
  if (thin) customStyle.padding = 3

  return (
    <div className={classes.borderGradient} style={customStyle}>
      {children}
    </div>
  )
}

export default WithGradient
