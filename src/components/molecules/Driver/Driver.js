import React, {Component} from 'react'
import './Driver.scss'

const Driver = ({onClick, ...props}) => {
  console.log(props)

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


  return (
    <div className="driver" onClick={() => onClick({...props})}>
      <div className="driver__img-container">
        <img src={props.picture.large} alt=""/>
      </div>

      <div className="driver__info">
        <h1>{capitalize(props.name.title)}. {capitalize(props.name.first)} {capitalize(props.name.last)}</h1>


        <div className="driver__details">
          <span className="driver__email">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-mail">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
            </svg>
            {props.email}
          </span>

          <span className="driver__phone">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-smartphone">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                <line x1="12" y1="18" x2="12" y2="18"/>
            </svg>
            {props.phone}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Driver
