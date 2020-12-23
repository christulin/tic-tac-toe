import './Styles/_main.scss';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { TicTacToe } from './Routes/TicTacToe';
import { Login } from './Routes/Login';
import { ConnectFour } from './Routes/ConnectFour';
import Navbar from './Layouts/NavBar';

export default function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/connect-four">
            <ConnectFour />
          </Route>
          <Route path="/tic-tac-toe">
            <TicTacToe />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
