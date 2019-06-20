import React from 'react'
import Card from "components/molecules/Card";
import Order from "components/molecules/Order";

/**
 * Orders container that will loop through orders array and pass its props to
 * Order component, which represents the order in a unique way.
 * @param data
 * @param onSelectedOrder
 * @returns {*}
 * @constructor
 */
const Orders = ({data, onSelectedOrder}) => {
  return (
    <Card style={{overflowY: "scroll"}}>
      {data.map((driver, i) => (
        <Order
          key={i}
          {...driver}
          onClick={({lat, lon}) => onSelectedOrder({lat, lon})}
        />
      ))}
    </Card>
  )
}

export default Orders
