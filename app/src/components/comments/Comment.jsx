import React from 'react';
import moment from 'moment';
import Button from '../buttons/Button';


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

    if (diff > 86400) {
      return `${Math.floor(diff/86400)}d`;
    } else if (diff > 3600) {
      return `${Math.floor(diff/3600)}h`;
    } else if (diff > 60) {
      return `${Math.floor(diff/60)}m`;
    } else { 
      return 'A few seconds ago';
    }

  }

  render() {
    const {value} = this.props;

    return (
      <div className="box">
        <article className="media">
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{value.user} </strong>
                <span> {this.timeSinceCreated()}</span>
              </p>
              <p>
                {value.message}
              </p>
            </div>
          </div>
        </article>
      </div>
    )
  }
}

export default Comment;