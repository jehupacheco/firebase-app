import React from 'react';
import {logOut} from '../utils/firebase';

const Logout = React.createClass({
  componentDidMount() {
    logOut()
  },

  render() {
    return <p>You are now logged out</p>
  }
})

export default Logout;