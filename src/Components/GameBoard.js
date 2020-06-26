import React from 'react';
import Square from './Square';
import * as utils from '../utils/functions';

export class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.state = {
      squareArray: Array(9).fill(null),
      history: [],
      xIsNext: true,
      squareActive: ['square active', 'square', 'square', 'square', 'square', 'square', 'square', 'square', 'square'],
      cursor: [0]
    };
  }

  handleKeyDown(num, e) {
     
      var buttons = document.getElementsByTagName('button');

      const toggleActive = this.state.squareActive.slice();

      if (e.keyCode === 37 && num > 0) {
        let newNum = num - 1;
        buttons[newNum].focus();
        toggleActive[num] = 'square';
        toggleActive[newNum] = 'square active';
        this.setState({
          squareActive: toggleActive
        })
      } else if (e.keyCode === 39 && num < 8) {
        let newNum = num + 1;
        buttons[newNum].focus();
        toggleActive[num] = 'square';
        toggleActive[newNum] = 'square active';
        this.setState({
          squareActive: toggleActive
        })
      } else if (e.keyCode === 38 && num > 2) {
        let newNum = num - 3;
        buttons[newNum].focus();
        toggleActive[num] = 'square';
        toggleActive[newNum] = 'square active';
        this.setState({
          squareActive: toggleActive
        })

      } else if (e.keyCode === 40 && num < 6) {
        let newNum = num + 3;
        buttons[newNum].focus();
        toggleActive[num] = 'square';
        toggleActive[newNum] = 'square active';
        this.setState({
          squareActive: toggleActive
        })
      }
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
            <Square addFocus="autofocus" value={this.state.squareArray[0]} class={this.state.squareActive[0]} onKeyDown={(e) => this.handleKeyDown(0, e)} onClick={() => this.handleSquareClick(0)} />
            <Square value={this.state.squareArray[1]} class={this.state.squareActive[1]} onKeyDown={(e) => this.handleKeyDown(1, e)} onClick={() => this.handleSquareClick(1)} />
            <Square value={this.state.squareArray[2]} class={this.state.squareActive[2]} onKeyDown={(e) => this.handleKeyDown(2, e)} onClick={() => this.handleSquareClick(2)} />
          </div>
          <div className="board-row">
            <Square value={this.state.squareArray[3]} class={this.state.squareActive[3]} onKeyDown={(e) => this.handleKeyDown(3, e)} onClick={() => this.handleSquareClick(3)} />
            <Square value={this.state.squareArray[4]} class={this.state.squareActive[4]} onKeyDown={(e) => this.handleKeyDown(4, e)} onClick={() => this.handleSquareClick(4)} />
            <Square value={this.state.squareArray[5]} class={this.state.squareActive[5]} onKeyDown={(e) => this.handleKeyDown(5, e)} onClick={() => this.handleSquareClick(5)} />
          </div>
          <div className="board-row">
            <Square value={this.state.squareArray[6]} class={this.state.squareActive[6]} onKeyDown={(e) => this.handleKeyDown(6, e)} onClick={() => this.handleSquareClick(6)} />
            <Square value={this.state.squareArray[7]} class={this.state.squareActive[7]} onKeyDown={(e) => this.handleKeyDown(7, e)} onClick={() => this.handleSquareClick(7)} />
            <Square value={this.state.squareArray[8]} class={this.state.squareActive[8]} onKeyDown={(e) => this.handleKeyDown(8, e)} onClick={() => this.handleSquareClick(8)} />
          </div>
        </div>
      </div>
    );
  }
}
