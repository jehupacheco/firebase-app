import React from 'react';
import FoodCreateMap from '../map/FoodCreateMap';
import Button from '../buttons/Button';
import moment from 'moment';
import {insertData, uploadFile} from '../../utils/firebase';

class FoodCreator extends React.Component {
  state = {
    icon: null,
    iconPreviewUrl: '',
  }

  createFood = (iconUrl) => {
    const position = this.map.getLocation();
    const food = {
      createdAt: moment().unix(),
      icon: iconUrl,
      lat: position.lat,
      lng: position.lng,
      name: this.inputName.value,
      region: this.map.getSearchValue(),
    }

    insertData('/food', 'food', food);
  }

  createFoodHandler = () => {
    const { icon } = this.state;

    uploadFile(icon, icon.name, this.createFood);
  }

  inputIconChangeHandler = (e) => {
    let file = e.target.files[0];
    console.log(file);
    let reader = new FileReader();

    reader.onloadend = () => {
      this.setState({
        icon: file,
        iconPreviewUrl: reader.result,
      });
    }

    reader.readAsDataURL(file);
  }

  render() {
    const {
      icon,
      iconPreviewUrl,
    } = this.state;

    return (
      <div className="box">
        <div className="columns">
          <div className="column">
            <h2>Create Food</h2>
            <label className="label">Name</label>
            <p className="control">
              <input type="text" className="input" ref={(input) => {this.inputName = input}}/>
            </p>
            <label className="label">Icon</label>
            <div className="control">
              <div className="columns">
                <div className="column">
                  {(icon === null) ? (
                    <span>Select an icon</span>
                  ) : (
                    <figure className="image is-96x96">
                      <img src={iconPreviewUrl} alt="Food Icon"/>
                    </figure>
                  )}
                </div>
                <div className="column">
                  <label htmlFor="icon">
                    <Button modifiers="is-primary" icon="fa fa-upload">Select image</Button>
                  </label>
                  <input id="icon"
                        type="file"
                        ref={(input) => {this.inputIcon = input;}}
                        style={{display: 'none'}}
                        onChange={this.inputIconChangeHandler}/>
                </div>
              </div>
            </div>
            <Button modifiers="is-success" icon="fa fa-plus" handler={this.createFoodHandler}>Add</Button>
          </div>
          <div className="column" style={{height: '300px'}}>
            <FoodCreateMap ref={(map) => {this.map = map; }}/>
          </div>
        </div>
      </div>
    );
  }

}

export default FoodCreator;