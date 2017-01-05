import React from 'react';
import _ from 'lodash';

const ButtonGroup = ({children}) => {
  return (
    <div className="control is-grouped">
    {
      _.map(children, (child, index) => {
        return (
          <p className="control" key={index}>
            {child}
          </p>
        )
      })
    }
    </div>
  )
}

export default ButtonGroup