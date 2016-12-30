import React from 'react';
import _ from 'lodash';

class Home extends React.Component {
  render() {
    return (
      <div className="section">
        <div className="container">
          <h1 className="title">This is Home</h1>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Home;