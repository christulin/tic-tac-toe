import React from 'react';
import { Link } from 'react-router-dom';
import Square from './Square';
import * as utils from '../utils/functions';

export class GameBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      squareArray: Array(9).fill(null),
      history: [],
      xIsNext: true,
    };
  }

  handleSquareClick(num) {
    const squares = this.state.squareArray.slice();

    if (squares[num]) {
      console.log('this has already been clicked');
      return;
    }

    squares[num] = this.state.xIsNext ? 'x' : 'o';

    this.setState({
      squareArray: squares,
      xIsNext: !this.state.xIsNext,
    });

    if (utils.checkForWinner(squares)) {
      return;
    }
  }

  render() {
    return (
      <div className="board-wrapper">
        <div className="hud">
          <h3 className="turn-indicator">Current Player: {this.state.xIsNext ? 'X' : 'O'}</h3>
        </div>
        <div className="board">
          <div className="board-row">
            <Square value={this.state.squareArray[0]} onClick={() => this.handleSquareClick(0)} />
            <Square value={this.state.squareArray[1]} onClick={() => this.handleSquareClick(1)} />
            <Square value={this.state.squareArray[2]} onClick={() => this.handleSquareClick(2)} />
          </div>
          <div className="board-row">
            <Square value={this.state.squareArray[3]} onClick={() => this.handleSquareClick(3)} />
            <Square value={this.state.squareArray[4]} onClick={() => this.handleSquareClick(4)} />
            <Square value={this.state.squareArray[5]} onClick={() => this.handleSquareClick(5)} />
          </div>
          <div className="board-row">
            <Square value={this.state.squareArray[6]} onClick={() => this.handleSquareClick(6)} />
            <Square value={this.state.squareArray[7]} onClick={() => this.handleSquareClick(7)} />
            <Square value={this.state.squareArray[8]} onClick={() => this.handleSquareClick(8)} />
          </div>
        </div>
      </div>
    );
  }
}
