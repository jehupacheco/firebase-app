import React from 'react';
import _ from 'lodash';
import CommentManager from './comments/CommentManager';
import Map from './map/Map';
import { KmlLayer } from 'react-google-maps';
import regionsRawKml from '../regions.kml';
import tj from '@mapbox/togeojson';
// import { DOMParser, XMLSerializer } from 'xmldom';

class Home extends React.Component {
  commentsTitle = <p className="title"><strong>Last Comments</strong></p>

  commentsSortFunction = (comment) => {
    return -comment.createdAt;
  }

  commentsFilterFunction = (comment) => {
    return comment.state === "approved";
  }

  render() {
    const kml = new DOMParser().parseFromString(regionsRawKml, 'application/xml');
    console.log(tj.kml(kml));

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
              >
                <KmlLayer url="https://raw.githubusercontent.com/jehupacheco/firebase-app/master/app/peru-departamentos.kml"/>
              </Map>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;