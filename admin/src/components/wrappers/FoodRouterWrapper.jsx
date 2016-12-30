import React from 'react';
import FoodManager from '../food/FoodManager';

const FoodRouterWrapper = ({route}) => {
  const title = <p className="title"><strong>Food</strong></p>

  return (
    <FoodManager path={route.uri} paginate={route.paginate} itemsPerPage={route.itemsPerPage} title={title}/>
  )
}

export default FoodRouterWrapper;