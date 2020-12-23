import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const NavBar = () => (
  <div className="nav-wrapper">
    <ul>
      <li>Dev Nav</li>
    </ul>
    <ul className="links">
      <li>
        <Link to="/">Login</Link>
      </li>
      <li>
        <Link to="/tic-tac-toe">Tic Tac Toe</Link>
      </li>
      <li>
        <Link to="/connect-four">Connect Four</Link>
      </li>
    </ul>
  </div>
);

export default NavBar;
