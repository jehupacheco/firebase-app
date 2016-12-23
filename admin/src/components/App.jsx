import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { loggedIn, setOnAuthChange } from '../utils/firebase';
import '../css/App.css';

class App extends Component {
  state = {
    loggedIn: loggedIn(),
  }

  updateAuth = (loggedIn) => {
    this.setState({ loggedIn });

    if (loggedIn) {
      browserHistory.push('/home');
    } else {
      browserHistory.push('/login');
    }
  }

  componentWillMount = () => {
    setOnAuthChange(this.updateAuth);
  }

  render() {
    return (
      <div>
        <nav className="nav has-shadow">
          <div className="nav-left">
            <span className="nav-item">
              {this.state.loggedIn ? (
                  <Link to="/logout">Logout</Link>
                ) : (
                  <Link to="/login">Login</Link>
                )
              }
            </span>
          </div>
          <div className="nav-left">
            <span className="nav-item">
              <Link to="/home">Home</Link>
            </span>
          </div>
        </nav>
        {this.props.children}
      </div>
    );
  }
}

export default App;
