import React from 'react';
import ManagerFactory from '../managers/ManagerFactory';
import FoodList from './FoodList';
import FoodCreator from './FoodCreator';

const RawFoodManager = ManagerFactory(FoodList);

const FoodManager = (props) => {
  return (
    <div className="content">
      <RawFoodManager {...props}/>
      <FoodCreator/>
    </div>
  )
}

export default FoodManager;