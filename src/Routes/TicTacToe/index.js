import React from 'react';
import Square from './Square';
import NavBar from './NavBar';
import * as utils from './functions';
import io from 'socket.io-client';

const socket = io('localhost:3030');

export class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {
      squareArray: Array(9).fill(null),
      history: [],
      xIsNext: true,
      isConnected: socket.connected,

      squareActive: [
        'square active _0',
        'square _1',
        'square _2',
        'square _3',
        'square _4',
        'square _5',
        'square _6',
        'square _7',
        'square _8',
      ],
      cursor: [0],
    };
  }

  handleKeyDown(num, e) {
    let buttons = document.getElementsByClassName('square');
    const toggleActive = this.state.squareActive.slice();
    let newNum;

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
      toggleActive[num] = 'square' + ' _' + num.toString();
      toggleActive[newNum] = 'square active' + ' _' + newNum.toString();
      this.setState({
        squareActive: toggleActive,
      });
    }
  }

  componentDidMount() {
    socket.on('connect', () => {
      this.setState({ isConnected: true });
    });

    socket.on('disconnect', () => {
      this.setState({ isConnected: false });
    });

    socket.on('update squares', update => {
      this.setState({
        squareArray: update,
        xIsNext: !this.state.xIsNext,
      });
    });
  }

  componentWillUnmount() {
    socket.off('connect');
    socket.off('disconnect');
    socket.off('message');
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

    socket.emit('new state', squares);

    if (utils.checkForWinner(squares)) {
      return;
    }
  }

  render() {
    var arrays = [];
    var divs = [];
    this.state.squareArray.forEach((square, i) => {
      arrays.push(
        <Square
          {...(i === 0 ? { addFocus: 'autofocus' } : {})}
          value={this.state.squareArray[i]}
          classname={this.state.squareActive[i]}
          onKeyDown={e => this.handleKeyDown(i, e)}
          onClick={() => this.handleSquareClick(i)}
        />
      );
      if ((i + 1) % 3 === 0) {
        divs.push(<div class="board-row" children={arrays.slice()} />);
        arrays = [];
      }
    });

    return (
      <div className="board-wrapper">
        <div className="nav-wrapper">
          <NavBar />
        </div>
        <div className="hud">
          <h3 className="turn-indicator">Current Player: {this.state.xIsNext ? 'X' : 'O'}</h3>
        </div>
        <div className="board">
          <div className="inner-board-wrapper">{divs}</div>
        </div>
      </div>
    );
  }
}
