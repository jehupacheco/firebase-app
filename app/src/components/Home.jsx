import React from 'react';
import _ from 'lodash';
import CommentManager from './comments/CommentManager';
import Map from './map/Map';
import regionsRawKml from '../regions.kml';
import tj from '@mapbox/togeojson';
import { listenToRoute } from '../utils/firebase';

const google = window.google;

class Home extends React.Component {
  commentsTitle = <p className="title"><strong>Last Comments</strong></p>
  regions = {
    coordinates: {},
    bounds: {},
    polygons: {},
  }
  tries = _.range(100);

  state = {
    markers: [],
    food: [],
  }

  getRandomPosition = (regionName) => {
    const bounds = this.regions.bounds[regionName];
    const polygon = this.regions.polygons[regionName];
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();
    let p;

    const notMatch = _.every(this.tries, (value, index) => {
      const lat = Math.random() * (ne.lat() - sw.lat()) + sw.lat();
      const lng = Math.random() * (ne.lng() - sw.lng()) + sw.lng();
      const point = new google.maps.LatLng(lat,lng);
      p = point;
      return !google.maps.geometry.poly.containsLocation(point, polygon);
    });

    if (notMatch) {
      return this.regions.coordinates[regionName][0];
    } else {
      return p;
    }
  }

  updateFood = (food) => {
    const markers = [];

    _.map(food, (item, index) => {
      const icon = {
        url: item.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      markers.push({
        icon: icon,
        title: item.name,
        position: this.getRandomPosition(item.region),
      })
    });

    this.setState({ food, markers });
  }

  commentsSortFunction = (comment) => {
    return -comment.createdAt;
  }

  commentsFilterFunction = (comment) => {
    return comment.state === "approved";
  }

  getLatLngCoordinate = (coordinates) => {
    return _.map(coordinates, (coord) => { return {lat: coord[0], lng: coord[1]}; });
  }

  getLatLngBounds = (coordinates) => {
    const bounds = new google.maps.LatLngBounds();

    _.map(coordinates, (coord) => { 
      bounds.extend(coord);
    });

    return bounds;
  }

  componentWillMount() {
    const kml = new DOMParser().parseFromString(regionsRawKml, 'application/xml');
    const geojson = tj.kml(kml);

    _.map(geojson.features, (region) => {
      const coordinates = region.geometry.coordinates[0];
      const key = region.properties.styleUrl.substr(1).toLowerCase().replace(/ /g, '_');
      this.regions.coordinates[key] = this.getLatLngCoordinate(coordinates);
      this.regions.bounds[key] = this.getLatLngBounds(this.regions.coordinates[key]);
      this.regions.polygons[key] = new google.maps.Data.Polygon([this.regions.coordinates[key]]);
    });

    listenToRoute('food', this.updateFood, true);
  }

  render() {
    return (
      <div className="section">
        <div className="container">
          <h1 className="title">This is Home</h1>
          <div className="columns">
            <div className="column is-half">
              <CommentManager path="comments"
                              sortFunction={this.commentsSortFunction}
                              filterFunction={this.commentsFilterFunction}
              />
            </div>
            <div className="column is-half" style={{height: '560px'}}>
              <Map
                containerElement={
                  <div style={{ height: '100%'}} />
                }
                mapElement={
                  <div style={{ height: '100%'}} />
                }
                markers={[]}
                zoom={12}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;