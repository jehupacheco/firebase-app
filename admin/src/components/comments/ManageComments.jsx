import React from 'react';
import _ from 'lodash';
import Comments from './Comments';
import Paginator from '../paginator/Paginator';
import Button from '../buttons/Button';
import ButtonGroup from '../buttons/ButtonGroup';

class ManageComments extends React.Component {
  state = {
    currentPage: 1,
    filters: {
      state: 'all',
    },
  }

  setFilters = (filters) => {
    this.setState({ filters });
  }

  filterClassName = (buttonName) => {
    const {state} = this.state.filters;

    if (state === buttonName) {
      return '';
    } else {
      return 'is-white';
    }
  }

  renderFilters = () => {
    return (
      <div className="columns">
        <div className="column is-half"></div>
        <div className="column is-half">
          <ButtonGroup>
            {
              _.map(['all', 'approve', 'pending', 'disapprove'], (state) => {
                return (
                  <Button modifiers={this.filterClassName(state)}
                          handler={() => {this.setFilters({ state })}}
                          key={state}>
                    {state.charAt(0).toUpperCase() + state.slice(1)}
                  </Button>
                )
              })
            }
          </ButtonGroup>
        </div>
      </div>
    )
  }

  numberOfPages = () => {
    const {comments, paginate, itemsPerPage} = this.props;
    const nComments = _.size(comments);

    if (paginate) {
      return Math.ceil(nComments / itemsPerPage);
    } else { 
      return 1;
    }
  }

  setCurrentPage = (currentPage) => {
    this.setState({ currentPage });
  }

  getComments = () => {
    const { comments, paginate, itemsPerPage} = this.props;
    const { currentPage } =this.state;

    let showComments = comments;

    if (paginate) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = currentPage * itemsPerPage;

      showComments = _.slice(comments, startIndex, endIndex);
    }

    return showComments;
  }

  render() {
    const { paginate } = this.props;
    const { currentPage } =this.state;

    return(
      <div>
        {this.renderFilters()}
        <Comments comments={this.getComments()}/>
        {paginate && 
          <Paginator numberOfPages={this.numberOfPages()}
                     activePage={currentPage}
                     setPage={this.setCurrentPage}/>
        }
      </div>
    )
  }
}

ManageComments.defaultProps = {
  paginate: false,
  itemsPerPage: 10,
}

export default ManageComments;