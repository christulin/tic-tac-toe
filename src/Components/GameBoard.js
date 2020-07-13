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
      var newNum;

      if (e.keyCode === 37 && num > 0) {
        newNum = num - 1;
       
      } else if (e.keyCode === 39 && num < 8) {
        newNum = num + 1;
      
      } else if (e.keyCode === 38 && num > 2) {
        newNum = num - 3;

      } else if (e.keyCode === 40 && num < 6) {
        newNum = num + 3;
      }
      if (newNum || newNum === 0) {
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
    var arrays = [];
    var divs = [];
    this.state.squareArray.forEach((square, i) => {

        arrays.push(<Square
          {...(i === 0 ? {addFocus: 'autofocus'} : {})}
          value={this.state.squareArray[i]}
          class={this.state.squareActive[i]}
          onKeyDown={(e) => this.handleKeyDown(i, e)}
          onClick={() => this.handleSquareClick(i)}
        />)
        if ((i + 1) % 3 === 0) {
          divs.push(<div class="board-row" children={arrays.slice()}/>)
          arrays = []
        } 
      })

    return (
      
      <div className="board-wrapper">
        <div className="hud">
          <h3 className="turn-indicator">Current Player: {this.state.xIsNext ? 'X' : 'O'}</h3>
        </div>
        <div className="board">
          {divs}
        </div>
      </div>
    );
  }
}
