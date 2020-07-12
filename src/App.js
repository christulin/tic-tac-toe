import React from 'react';
import { GameBoard } from './components/GameBoard';
import { BrowserRouter, Route } from 'react-router-dom';

import './styles/_main.scss';

function App() {
  return (
    <div className="App">
      <GameBoard/>
    </div>
  );
}

export default App;
