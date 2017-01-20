import React from 'react';
import FoodCreateMap from '../map/FoodCreateMap';
import Button from '../buttons/Button';
import moment from 'moment';
import {insertData, uploadFile} from '../../utils/firebase';

class FoodCreator extends React.Component {
  state = {
    icon: null,
    iconPreviewUrl: '',
    errors: ''
  }

  validateInput = () => {
    const {
      icon,
    } = this.state;
    const name = this.inputName.value;
    const region = this.map.getSearchValue();
    let errors = '';

    if (icon === null) {
      errors = 'An icon is required';
    }
    if (name.length === 0) {
      errors = `${errors}, A name is required`;
    }
    if (region.length === 0) {
      errors = `${errors}, A region is required`;
    }

    this.setState({ errors });

    return errors.length === 0;
  }

  createFood = (iconUrl) => {
    const position = this.map.getLocation();
    const food = {
      createdAt: moment().unix(),
      icon: iconUrl,
      lat: position.lat,
      lng: position.lng,
      name: this.inputName.value,
      region: this.map.getSearchValue().split(',')[0].toLowerCase().replace(' ','_'),
    }

    insertData('/food', 'food', food);
  }

  createFoodHandler = () => {
    const { icon } = this.state;

    if (this.validateInput()) {
      uploadFile(icon, icon.name, this.createFood);
    }
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

  renderErrors = () => {
    const errors = this.state.errors;

    if (errors.length === 0) {
      return '';
    } else {
      return (
        <div className="notification is-danger">
          {errors}
        </div>
      )
    }
  }

  render() {
    const {
      icon,
      iconPreviewUrl,
    } = this.state;

    return (
      <div className="box">
        { this.renderErrors()}
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