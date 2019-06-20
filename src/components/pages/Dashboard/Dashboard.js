import React, { Component } from "react"
import Default from 'components/templates/Default'
import Drivers from "components/organisms/Drivers"
import Orders from "components/organisms/Orders"
import Card from "components/molecules/Card"
import Map from "components/molecules/Map"
import OrdersData from 'fake_order.json'
import GPS from 'fake_gps.csv'
import Fetch from "./Fetch"

/**
 * Dashboard component holds the entire 3 main main parts of the page, namely,
 * the users card, orders card and google map
 */
class Dashboard extends Component {
  // our local state object
  state = {
    // will hold a list of users (drivers)
    drivers: void 0, // we use `void 0` instead of undefined because you can init values to undefined
    // will hold the k closest drivers to a given origin
    closestDrivers: void 0,
    // will hold the selected order
    selectedOrder: {
      lat: void 0,
      lon: void 0
    }
  }

  async componentDidMount() {
    // we're using Randomusers.me api for mock user's data and some fake GPS in the form of (lat, lon)
    const
      drivers = await Fetch("https://randomuser.me/api?nat=gb&results=246", 'json'),
      gps = await Fetch(GPS, 'text')

    // save them to our local component state
    this.setState({
      drivers: drivers.results,
      gps
    })
  }

  /**
   * When the user clicks on a order, we need to propagate that order from child component (<Order >) to parent
   * component (Dashboard), so that we can pass it to google map to update the marker.
   * @param lat
   * @param lon
   */
  selectedOrder = ({lat, lon}) => this.setState({
    // we need to recalculate the closest distance based on the current selected order
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
