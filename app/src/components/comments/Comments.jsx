import React from 'react';
import _ from 'lodash';
import Comment from './Comment';

const Comments = ({items}) => {
  return (
    <div className="content comments">
      {_.map(items, (value, key) => {
          return <Comment value={value} key={key}/>;
        })
      }
    </div>
  )
}

export default Comments;