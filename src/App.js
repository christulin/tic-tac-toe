import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './Styles/_main.scss';

import { TicTacToe } from './Routes/TicTacToe';
import { Login } from './Routes/Login';
import { ConnectFour } from './Routes/ConnectFour';

export default function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/connect-four">
            <ConnectFour />
          </Route>
          <Route path="/">
            <TicTacToe />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
