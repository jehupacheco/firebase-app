import React from 'react';
import { withGoogleMap, GoogleMap, Marker} from 'react-google-maps';

const Map = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    zoom={props.zoom}
    center={props.center}
    onClick={props.onMapClick}
  >
    {
      props.markers.map((marker, index) => {
        return (
        <Marker
          {...marker}
          onRightClick={() => props.onMarkerRightClick(marker)}
          key={index}
        />
        )
      })
    }
    {props.children}
  </GoogleMap>
));

Map.defaultProps = {
  center: {
    lat: -25.363882,
    lng: 131.044922,
  },
  zoom: 3,
}

export default Map;