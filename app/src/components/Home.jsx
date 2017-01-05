import React from 'react';
import _ from 'lodash';
import CommentManager from './comments/CommentManager';
import Map from './map/Map';

class Home extends React.Component {
  commentsTitle = <p className="title"><strong>Last Comments</strong></p>

  commentsSortFunction = (comment) => {
    return -comment.createdAt;
  }

  commentsFilterFunction = (comment) => {
    return comment.state === "approved";
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