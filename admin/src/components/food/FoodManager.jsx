import React from 'react';
import ManagerFactory from '../managers/ManagerFactory';
import FoodList from './FoodList';
import FoodCreator from './FoodCreator';
import Button from '../buttons/Button';

const RawFoodManager = ManagerFactory(FoodList);

const FoodManager = (props) => {
  return (
    <div className="content">
      <RawFoodManager {...props}/>
      <FoodCreator/>
      <Button modifiers="is-success" icon="fa fa-plus">Add</Button>
    </div>
  )
}

export default FoodManager;