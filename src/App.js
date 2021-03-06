import './Styles/_main.scss';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Layouts/NavBar';
import Login from './Routes/Login';
import { TicTacToe } from './Routes/TicTacToe';
import { ConnectFour } from './Routes/ConnectFour';
import { Hangman } from './Routes/Hangman';

export default function App() {
  const gameOptions = [
    { value: 'tic-tac-toe', label: 'Tic Tac Toe' },
    { value: 'connect-four', label: 'Connect Four' },
    { value: 'hangman', label: 'Hangman' },
  ];

  return (
    <Router>
      <Navbar></Navbar>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Login gameOptions={gameOptions} />
          </Route>
          <Route path="/connect-four">
            <ConnectFour />
          </Route>
          <Route path="/tic-tac-toe">
            <TicTacToe />
          </Route>
          <Route path="/hangman">
            <Hangman />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
