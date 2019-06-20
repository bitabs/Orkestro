import React, { Component } from "react"
import Default from 'components/templates/Default'
import Fetch from "./Fetch";
import Drivers from "components/organisms/Drivers"
import GPS from 'fake_gps.csv'
import Orders from "../../organisms/Orders";
import OrdersData from 'fake_order.json'
import Map from "components/molecules/Map";
import Card from "components/molecules/Card";

class Dashboard extends Component {
  state = {
    drivers: void 0,
    closestDrivers: void 0,
    selectedDriver: {
      lat: void 0,
      lon: void 0
    },
    selectedOrder: {
      lat: void 0,
      lon: void 0
    }
  }

  async componentDidMount() {
    const
      drivers = await Fetch("https://randomuser.me/api?nat=gb&results=246", 'json'),
      gps = await Fetch(GPS, 'text')

    this.setState({
      drivers: drivers.results,
      gps
    })
  }

  selectedDriver = ({...props}) => this.setState({
    selectedDriver: {
      lat: props.location.coordinates.latitude,
      lon: props.location.coordinates.longitude
    }
  })

  selectedOrder = ({lat, lon}) => this.setState({
    closestDrivers: this.closest(this.state.drivers, [lat, lon], 4),
    selectedOrder: {
      lat, lon
    }
  })


  /**
   * KClosest algorithm: Given an array of (lat, lon) [1..n], and an origin,
   * typically the (lat, lon) of the selected order, it will calculate k
   * closest drivers to the Order's location
   * @param points: [(x, y)]
   * @param origin: (x, y)
   * @param K: number of elements to compare against
   * @runningTime: O((n log n) + K): (n log n) is the quick sort algorithm used
   * to sort the array. Then, O(k) to fetch the K elements form the array [0..K]
   * @returns {Uint16Array}
   */
  closest = (points, origin, K) => points.sort((driver, otherDriver) => {
    const
      d1GeoLoc = [parseFloat(driver.location.coordinates.latitude), parseFloat(driver.location.coordinates.longitude)],
      d2GeoLoc = [parseFloat(otherDriver.location.coordinates.latitude), parseFloat(otherDriver.location.coordinates.longitude)]
    return this.euclid(origin, d1GeoLoc) - this.euclid(origin, d2GeoLoc)
  }).slice(1, K)

  /**
   * Euclidean distance formula to calculate the distance between two points.
   * @return {number}
   */
  euclid = (x, y) => {
    return (x[0] - y[0]) * (x[0] - y[0]) + (x[1] - y[1]) * (x[1] - y[1])
  };

  render() {
    const { drivers, gps, selectedOrder: {lat, lon}, closestDrivers } = this.state

    return (
      <Default>
        {drivers && (
          <Drivers
            drivers={drivers}
            gps={gps}
            onSelectedDriver={this.selectedDriver}
          />
        )}

        {drivers && (
          <Card>
            <Map
              drivers={closestDrivers || drivers}
              orderLat={lat}
              orderLon={lon}
            />
          </Card>
        )}

        {gps && (
          <Orders
            data={OrdersData}
            onSelectedOrder={this.selectedOrder}
          />
        )}
      </Default>
    );
  }

}
export default Dashboard;
