import React from 'react';
import _ from 'lodash';
import Comment from './Comment';

const Comments = ({comments}) => {
  return (
    <div className="content">
      {_.map(comments, (value, key) => {
          return <Comment value={value} key={key}/>;
        })
      }
    </div>
  )
}

export default Comments;