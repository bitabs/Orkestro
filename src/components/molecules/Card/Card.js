import React from 'react'
import './Card.scss'

/**
 * Card component is a simply stateless component, that has basic styles
 * @param children
 * @param style
 * @returns {*}
 * @constructor
 */
const Card = ({children, style}) => (
  <div className="card" style={style}>
    {children}
  </div>
)

export default Card
