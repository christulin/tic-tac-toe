import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './Styles/_main.scss';

import { TiCTacToe } from './Routes/TicTacToe';
import { Login } from './Routes/Login';

export default function App() {
  return (
    <Router>
      <div className="App">
        <div>
          <b>Routes</b>
          <div>
            <Link to="/">Board</Link>
          </div>
          <div>
            <Link to="/login">Login</Link>
          </div>
        </div>
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
