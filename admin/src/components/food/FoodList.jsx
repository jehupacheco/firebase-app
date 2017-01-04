import React from 'react';
import _ from 'lodash';
import Food from './Food';

const Comments = ({items}) => {
  return (
    <div className="columns is-multiline">
      {_.map(items, (value, key) => {
          return <Food {...value} key={key}/>
        })
      }
    </div>
  )
}

export default Comments;