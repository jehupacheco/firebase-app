import React from 'react';
import { logIn } from '../utils/firebase';

class Login extends React.Component {

  state = {
    validInput: {
      email: true,
    }, 
    errorLogin: false,
    errorLoginMessage: '',
  }

  validateInput = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const {validInput} = this.state;
    const valid = re.test(email);

    validInput.email = valid;
    this.setState({validInput: validInput});

    return valid;
  }

  sucessfulLogin = () => {}

  errorLogin = (error) => {
    this.setState({
      errorLogin: true,
      errorLoginMessage: error.message,
    });
  }

  login = (e) => {
    e.preventDefault();
    var data = new FormData(e.target);

    if (this.validateInput(data.get('email'))) {
      const credentials = {
        email: data.get('email'),
        password: data.get('password'),
      };

      logIn(credentials, this.sucessfulLogin, this.errorLogin);
    }
  }

  renderLoginForm = () => {
    const {validInput, errorLogin, errorLoginMessage} = this.state;
    const {errorMessages} = this.props;
    const emailClass = validInput.email ? 'input' : 'input is-danger';

    return (
      <form onSubmit={this.login}>
        <div className="box">
          <label className="label">Email</label>
          <p className="control">
            <input className={emailClass} type="text" placeholder="jsmith@example.org" name="email"/>
            {!validInput.email &&
              <span className="help is-danger">{errorMessages.email}</span>
            }
          </p>
          <label className="label">Password</label>
          <p className="control">
            <input className="input" type="password" placeholder="●●●●●●●" name="password"/>
          </p>
          {errorLogin &&
            <span className="help is-danger">{errorLoginMessage}</span>
          }
          <p className="control">
            <button className="button is-primary" type="submit">
              Login
            </button>
          </p>
        </div>
      </form>
    );
  }

  render() {
    return (
      <div className="login-wrapper">
        <div className="container">
            <div className="columns is-vcentered">
              <div className="column is-4 is-offset-4">
                <h1 className="title">
                  Login
                </h1>
                { this.renderLoginForm() }
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default Login;

Login.defaultProps = {
  errorMessages: {
    email: 'The email is invalid'
  }
}