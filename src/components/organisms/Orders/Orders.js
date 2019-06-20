import React from 'react'
import Card from "components/molecules/Card";
import Order from "../../molecules/Order";

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
