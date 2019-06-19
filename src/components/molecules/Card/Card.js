import React from 'react'
import './Card.scss'

const Card = ({children, style}) => (
  <div className="card" style={style}>
    {children}
  </div>
)

export default Card
