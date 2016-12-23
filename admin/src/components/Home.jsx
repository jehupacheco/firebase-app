import React from 'react';
import _ from 'lodash';
import {listenToRoute} from '../utils/firebase';
import ManageComments from './comments/ManageComments';

class Home extends React.Component {
  state = {
    comments: [],
  }

  updateComments = (comments) => {
    const sortedComments = _.sortBy(comments, [(c) => { return -c.createdAt}]);

    this.setState({comments: sortedComments});
  }

  componentWillMount() {
    listenToRoute('comments', this.updateComments);
  }

  render() {
    return (
      <div className="section">
        <div className="container">
          <h1 className="title">This is Home</h1>
          <div className="columns">
            <div className="column">
              <div className="box">
                <p className="title"><strong>Last Comments</strong></p>
                <ManageComments comments={this.state.comments} paginate={true} itemsPerPage={5}/>
              </div>
            </div>
            <div className="column">
              <div className="box"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;