import React from 'react';
import moment from 'moment';
import Button from '../buttons/Button';
import ButtonGroup from '../buttons/ButtonGroup';
import {setData} from '../../utils/firebase';

class Comment extends React.Component {

  approveButton = () => {
    return (
      <Button modifiers="is-success"
              icon="fa fa-check"
              handler={this.approve}>
              Approve
      </Button>
    )
  }

  disapproveButton = () => {
    return (
      <Button modifiers="is-danger"
              icon="fa fa-times"
              handler={this.disapprove}>
              Disapprove
      </Button>
    )
  }

  timeSinceCreated = () => {
    const {createdAt} = this.props.value;

    const now = moment().unix();
    const diff = now - createdAt;

    console.log(diff);

    if (diff > 3600) {
      return `${Math.floor(diff/3600)}h`;
    } else if (diff > 60) {
      return `${Math.floor(diff/60)}m`;
    } else { 
      return 'A few seconds ago';
    }

  }

  approve = () => {
    const {id} = this.props.value;
    setData(`/comments/${id}/state`, 'approved');
  }

  disapprove = () => {
    const {id} = this.props.value;
    setData(`/comments/${id}/state`, 'disapproved');
  }

  stateClassName = () => {
    const {state} = this.props.value;

    if (state === 'pending') {
      return 'is-warning';
    } else if (state === 'approved') {
      return 'is-success';
    } else if (state === 'disapproved') {
      return 'is-danger';
    }
  }

  renderActionButtons = () => {
    const {state} = this.props.value;

    if (state === 'pending') {
      return (
        <ButtonGroup>
          {this.approveButton()}
          {this.disapproveButton()}
        </ButtonGroup>
      );
    } else if (state === 'approved') {
      return this.disapproveButton();
    } else if (state === 'disapproved') {
      return this.approveButton();
    }
  }

  render() {
    const {value} = this.props;

    return (
      <div className="box">
        <article className="media">
          <div className="media-content">
            <div className="content">
              <div>
                <strong>{value.user} </strong>
                <span> {this.timeSinceCreated()}</span>
                <span className={`tag is-small ${this.stateClassName()}`}>
                  {value.state}
                </span>
              </div>
              <p>
                {value.message}
              </p>
            </div>
            {this.renderActionButtons()}
          </div>
        </article>
      </div>
    )
  }
}

export default Comment;