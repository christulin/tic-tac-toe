import React from 'react';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="route-login">
        <div className="sidebar">
          <h1>Tic Tac Toe</h1>
        </div>
        <div className="main">
          <form>
            <h2>Sign in to Tic Tac Toe</h2>
            <fieldset>
              <label for="login">Username or Email Address</label>
              <input
                type="text"
                name="login"
                id="login"
                tabindex="1"
                class="text-input"
                autocorrect="off"
                autocapitalize="off"
              />
            </fieldset>
            <fieldset>
              <label for="login">Password</label>
              <input
                type="text"
                name="login"
                id="login"
                tabindex="1"
                class="text-input"
                autocorrect="off"
                autocapitalize="off"
              />
            </fieldset>
            <input class="button form-sub" type="submit" value="Sign In" tabindex="3"></input>
          </form>
        </div>
      </div>
    );
  }
}
