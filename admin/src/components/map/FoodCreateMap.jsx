import React from 'react';
import Map from './Map';
import SearchBox from 'react-google-maps/lib/places/SearchBox';
import _ from 'lodash';

class FoodCreateMap extends React.Component {
  state = {
    markers: _.clone(this.props.markers),
    center: {
      lat: -12.046374,
      lng: -77.042793,
    },
    zoom: 7,
  }

  styles = {
    searchbox: {
      marginTop: '10px',
      padding: '8px',
      border: 0,
      width: '200px',
      borderRadius: '2px',
    }
  }

  getLocation = () => {
    return _.clone(this.state.center);
  }

  getSearchValue = () => {
    return this.searchbox._inputElement.value;
  }

  onPlacesChanged = (e) => {
    const google = window.google;
    const places = this.searchbox.getPlaces();
    const markers = [];
    const zoom = 12;
    let center;

    _.map(places, (place, index) => {
      if (place.geometry) {
        const icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        }

        markers.push({
          icon: icon,
          title: place.name,
          position: place.geometry.location
        });

        center = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
      }
    });

    this.setState({ markers, center, zoom });
  }

  render() {
    const {
      markers,
      center,
      zoom,
    } = this.state;

    return (
      <Map
        containerElement={
          <div style={{ height: '100%'}} />
        }
        mapElement={
          <div style={{ height: '100%'}} />
        }
        markers={markers}
        center={center}
        zoom={zoom}
      >
        <SearchBox
          controlPosition={window.google.maps.ControlPosition.TOP_CENTER} 
          inputPlaceHolder="Search ..."
          inputStyle={this.styles.searchbox}
          onPlacesChanged={this.onPlacesChanged}
          ref={(searchbox) => {this.searchbox = searchbox;}}
        />
      </Map>
    )
  }
}

FoodCreateMap.defaultProps = {
  markers: [],
}

export default FoodCreateMap;