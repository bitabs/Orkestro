import React from 'react'
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from 'react-google-maps'
import { compose, withProps, lifecycle } from 'recompose'
import './Map.scss'
import pin from 'assets/icons/pin.svg'

const API_KEY = "AIzaSyC3gLflvXVEGLuOS_1pA6eeQQ4ocguzTlE"
const Map = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=geometry,drawing,places`,
    loadingElement: <div className="map map__loading-element" />,
    containerElement: <div className="map map__container-element" />,
    mapElement: <div className="map map__map-element" />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
  })
)(props =>
  <GoogleMap
    defaultZoom={10}
    defaultCenter={new window.google.maps.LatLng(51.509865, -0.118092)}
    center={new window.google.maps.LatLng(props.orderLat || 51.509865, props.orderLon || -0.118092)}
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
