import React, { Component } from 'react'
import Fetch from "components/pages/Dashboard/Fetch";
import Card from "components/molecules/Card";
import Driver from "components/molecules/Driver";

class Drivers extends Component {
  state = {
    gps: void 0,
    drivers: void 0
  }

  async componentDidMount() {
    const
      { drivers, gps }  = this.props,
      cords             = gps.split('\n')

    for (let i = 0; i < cords.length; i++) {
      const [lat, lon] = cords[i].split(',')
      drivers[i].location.coordinates.latitude = lat
      drivers[i].location.coordinates.longitude = lon
    }

    this.setState({
      gps,
      drivers: drivers
    })
  }

  render() {
    const
      { onSelectedDriver } = this.props,
      { drivers } = this.state

    return (
      <Card style={{overflowY: "scroll"}}>
        {drivers && [...Array(10).keys()].map((driver, i) => {
          const {...props} = drivers[driver]
          return (
            <Driver
              key={i}
              {...props}
              onSelectedDriver={onSelectedDriver}
            />
          )
        })}

      </Card>
    )
  }

}

export default Drivers

/**
 return (
 <>
 <Card style={{overflowY: "scroll"}}>
 {[...Array(10).keys()].map((driver, i) => {
                  const {...props} = results[driver]
                  return (
                    <Driver
                      key={i}
                      {...props}
                      onClick={this.onClick}
                    />
                  )
                })}
 </Card>








 render() {
    return (
      <Fetch
        url={GPS}
        parseFormat={"text"}
        success={(data) => {
          const
            { results } = this.props.data,
            decode = data.split('\n')

          for (let i = 0; i < decode.length; i++) {
            const coords = decode[i].split(',')
            results[i].location.coordinates.latitude = coords[0]
            results[i].location.coordinates.longitude = coords[1]
          }

          return (
            <>
              <Card style={{overflowY: "scroll"}}>
                {[...Array(10).keys()].map((driver, i) => {
                  const {...props} = results[driver]
                  return (
                    <Driver
                      key={i}
                      {...props}
                      onClick={this.onClick}
                    />
                  )
                })}
              </Card>
            </>
          )
        }}
        loading={(loading) => <h1>{loading}</h1>}
        error={(err) => <h1>{err}</h1>}
      />
    )
  }





 <Card>
 <Map
 drivers={results}
 img={this.state.selectedDriver}
 lat={this.state.selectedLat}
 lon={this.state.selectedLong}
 />
 </Card>
 </>
 )*/
