import React from 'react';
import Axios from 'axios';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoading: false,
    };

    this.login = this.login.bind(this);
    this.updateField = this.updateField.bind(this);
  }

  login(event) {
    event.preventDefault();

    this.setState({ isLoading: true }, () => {
      Axios.post('http://localhost:8000/login', {
        username: this.state.username,
        password: this.state.password,
      })
        .then(response => {
          const isValid = typeof response.data == 'object' && 'success' in response.data && response.data.success;

          if (isValid) {
            console.log('Set Cookie/JWT');
          } else {
            console.log('Dont Set Cookie/JWT');
          }
        })
        .catch(error => {
          this.setState({
            isLoading: false,
          });
        })
        .finally(() => {
          this.setState({
            isLoading: false,
          });
        });
    });
  }

  updateField(fieldName, fieldValue) {
    this.setState({
      [fieldName]: fieldValue,
    });
  }

  render() {
    return (
      <div className="route-login">
        <div className="sidebar">
          <h1>Tic Tac Toe</h1>
          <h2>Is Loading {this.state.isLoading ? 'true' : 'false'}</h2>
        </div>
        <div className="main">
          <form onSubmit={this.login}>
            <h2>Sign in to Tic Tac Toe</h2>
            <fieldset>
              <label htmlFor="login">Username</label>
              <input
                onChange={event => this.updateField('username', event.target.value)}
                type="text"
                name="login"
                id="login"
              />
            </fieldset>
            <fieldset>
              <label htmlFor="password">Password</label>
              <input
                onChange={event => this.updateField('password', event.target.value)}
                type="password"
                name="password"
                id="password"
              />
            </fieldset>
            <input type="submit" value="Sign In"></input>
          </form>
        </div>
      </div>
    );
  }
}
