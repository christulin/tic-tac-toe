import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './Styles/_main.scss';

import { TiCTacToe } from './Routes/TicTacToe';
import { Login } from './Routes/Login';

export default function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <TiCTacToe />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
