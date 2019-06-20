import React, { Component } from 'react'
import Driver from "components/molecules/Driver"
import Card from "components/molecules/Card"

/**
 * This component is a container that holds drivers component.
 * We separate this component from individual driver
 */
class Drivers extends Component {
  state = {
    gps: void 0,
    drivers: void 0
  }

  async componentDidMount() {
    const
      { drivers, gps }  = this.props,
      cords             = gps.split('\n')

    // this is only a p.o.c (proof of concept). In a real world, I should have
    // the correct coordinates from an api.
    for (let i = 0; i < cords.length; i++) {
      // separate the lat and and lon from cords[i]
      const [lat, lon] = cords[i].split(',')
      // the coordinates from Randomuser api are anywhere in the word, inc. ocean,
      // which is wrong. So I'm only filtering the drivers around the UK
      drivers[i].location.coordinates.latitude = lat
      drivers[i].location.coordinates.longitude = lon
    }

    this.setState({
      gps,
      drivers: drivers
    })
  }

  render() {
    const { drivers } = this.state
    // I'm only capping users to 30, but one can increase it.

    return (
      <Card style={{overflowY: "scroll"}}>
        {drivers && [...Array(30).keys()].map((driver, i) => {
          const {...props} = drivers[driver]
          return (<Driver key={i} {...props} />)
        })}
      </Card>
    )
  }

}

export default Drivers
