import React, { Component } from 'react'
import Fetch from "components/pages/Dashboard/Fetch";
import GPS from 'fake_gps.csv'
import Card from "components/molecules/Card";
import Driver from "components/molecules/Driver";
import Map from "components/molecules/Map";

class Drivers extends Component {
  state = {}

  componentDidMount() {}

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

          console.log(this.props.data)

          return (
            <>
              <Card style={{overflowY: "scroll"}}>
                {[0].map((driver, i) => {
                  const {...props} = results[driver]
                  return (
                    <Driver
                      key={i}
                      {...props}
                    />
                  )
                })}
              </Card>
              <Card>
                <Map drivers={results}/>
              </Card>
            </>
          )
        }}
        loading={(loading) => <h1>{loading}</h1>}
        error={(err) => <h1>{err}</h1>}
      />
    )
  }
}

export default Drivers
