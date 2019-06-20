import React from 'react'
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from 'react-google-maps'
import { compose, withProps, lifecycle } from 'recompose'
import './Map.scss'
import pin from 'assets/icons/pin.svg'
// I know its bad to have the API key here, but I've restricted this to only be used within my domain
const API_KEY = "AIzaSyC3gLflvXVEGLuOS_1pA6eeQQ4ocguzTlE"

/**
 * HOC component for google map component
 */
const Map = compose(
  withProps({
    // first we need to request for google map api
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=geometry,drawing,places`,
    // before the map is loaded, this element gets loaded
    loadingElement: <div className="map map__loading-element" />,
    // this container holds will hold the map entirety
    containerElement: <div className="map map__container-element" />,
    // this element holds the actual map itself
    mapElement: <div className="map map__map-element" />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({})
)(props =>
  <GoogleMap
    defaultZoom={10}
    // the initial location when the page loads. Currently its London
    defaultCenter={new window.google.maps.LatLng(51.509865, -0.118092)}
    // when the user selects an order, we pass in their latitude and longitude
    center={new window.google.maps.LatLng(props.orderLat || 51.509865, props.orderLon || -0.118092)}
    // few google map configuration
    defaultOptions={{
      fullscreenControl: false,
      mapTypeControl: false,
      zoomControl: false,
      streetViewControl: false
    }}
  >

    {props.orderLat && props.orderLon && (
      <Marker
        defaultIcon={{
          url: pin,
          scaledSize: new window.google.maps.Size(30, 40)
        }}
        position={{ lat: parseFloat(props.orderLat), lng: parseFloat(props.orderLon) }}
      />
    )}

    {props.closestDrivers && props.closestDrivers.map((driver, i) => {
      const {latitude, longitude} = driver.location.coordinates
      return (
        <Marker
          key={i}
          position={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}
        />
      )
    })}

    {!props.closestDrivers && props.drivers.map((driver, i) => {
      const {latitude, longitude} = driver.location.coordinates
      return (
        <Marker
          key={i}
          position={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}
        />
      )
    })}
  </GoogleMap>
);

export default Map;
