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

  authUserNav = () => {
    return (
      <span className="nav-item">
        <span className="nav-item">
          <Link to="/home">Home</Link>
        </span>
        <span className="nav-item">
          <Link to="/comments">Comments</Link>
        </span>
        <span className="nav-item">
          <Link to="/food">Food</Link>
        </span>
        <span className="nav-item">
          <Link to="/logout">Logout</Link>
        </span>
      </span>
    )
  }

  render() {
    return (
      <div>
        <nav className="nav has-shadow">
          <div className="nav-right">
            {this.state.loggedIn ? (
                this.authUserNav()
              ) : (
                <span className="nav-item">
                  <Link to="/login">Login</Link>
                </span>
              )
            }
          </div>
        </nav>
        {this.props.children}
      </div>
    );
  }
}

export default App;
