import React from 'react';
import _ from 'lodash';
import {listenToRoute} from '../../utils/firebase';
import Paginator from '../paginator/Paginator';

const ManagerFactory = (ItemListComponent) => {
  class Manager extends React.Component {
    state = {
      items: [],
      currentPage: 1,
    }

    updateItems = (items) => {
      const sortedItems = _.sortBy(items, [(c) => { return -c.createdAt}]);
      this.setState({items: sortedItems});
    }

    componentWillMount() {
      listenToRoute(this.props.path, this.updateItems);
    }

    numberOfPages = () => {
      const {paginate, itemsPerPage} = this.props;
      const {items} = this.state;
      const nComments = _.size(items);

      if (paginate) {
        return Math.ceil(nComments / itemsPerPage);
      } else { 
        return 1;
      }
    }

    setCurrentPage = (currentPage) => {
      this.setState({ currentPage });
    }

    getItems = () => {
      const { paginate, itemsPerPage} = this.props;
      const { currentPage, items} =this.state;
      let showItems = items;

      if (paginate) {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = currentPage * itemsPerPage;
        showItems = _.slice(items, startIndex, endIndex);
      }

      return showItems;
    }

    render() {
      const { paginate, title } = this.props;
      const { currentPage } =this.state;

      return(
        <div className="columns">
          <div className="column">
            <div className="box">
              {title}
              <ItemListComponent items={this.getItems()}/>
              {paginate && 
                <Paginator numberOfPages={this.numberOfPages()}
                           activePage={currentPage}
                           setPage={this.setCurrentPage}/>
              }
            </div>
          </div>
        </div>
      )
    }
  }

  Manager.defaultProps = {
    paginate: false,
    itemsPerPage: 10,
    title: '',
  }

  Manager.propTypes = {
    path: React.PropTypes.string.isRequired,
    paginate: React.PropTypes.bool,
    itemsPerPage: React.PropTypes.number,
    title: React.PropTypes.node,
  }

  return Manager;
}

export default ManagerFactory;