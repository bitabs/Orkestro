import React from 'react'
import './Order.scss'

const Order = ({title, paragraph, pickupTime, pickupAddress, width, height, depth, lat, lon, onClick}) => (
  <div className="order" onClick={() => onClick({lat, lon})}>
    <div className="order__package-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="order__icon">
        <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
        <path
          d={`
             M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 
             4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 
             0 2 0l7-4A2 2 0 0 0 21 16z
          `}/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    </div>
    <div className="order__info">
      <h1 className="order__title">{title}</h1>
      <p className="order__paragraph">{paragraph}</p>
      <div className="order__icons">
        <div className="pickup-time">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          <span>{pickupTime}</span>
        </div>
        <div className="pickup-address">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <span>{pickupAddress}</span>
        </div>
        <div className="order__size">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
            <path
              d={`
                  M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 
                  0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 
                  4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z
                `}/>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
            <line x1="12" y1="22.08" x2="12" y2="12"/>
          </svg>
          <span className="packageSize">{`${width} x ${height} x ${depth}`}</span>
        </div>
      </div>
    </div>
  </div>
)

export default Order
