import React from 'react';
import { GameBoard } from './Components/GameBoard';
import { BrowserRouter, Route } from 'react-router-dom';

import './Styles/_main.scss';

function App() {
  return (
    <div className="App">
      <GameBoard/>
    </div>
  );
}

export default App;
