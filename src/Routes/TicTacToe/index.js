import React from 'react';
import Square from './Square';
import findBestMove from '../../utils/minimax';
import NavBar from './NavBar';
import * as utils from './functions';
import io from 'socket.io-client';

const socket = io('localhost:3030');

export class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {
      boardState: Array(9).fill(''),
      isActiveGame: true,
      history: [],
      xIsNext: true,
      isConnected: socket.connected,
      playAgainstComputer: false,

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

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.setComputer = this.setComputer.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleKeyDown(idx, e) {
    let buttons = document.getElementsByClassName('square');
    const toggleActive = this.state.squareActive.slice();
    let newIdx;

    if (e.keyCode === 37 && idx > 0) {
      newIdx = idx - 1;

    } else if (e.keyCode === 39 && idx < 8) {
      newIdx = idx + 1;

    } else if (e.keyCode === 38 && idx > 2) {
      newIdx = idx - 3;

    } else if (e.keyCode === 40 && idx < 6) {
      newIdx = idx + 3;
    }

    if (newIdx || newIdx === 0) {
      buttons[newIdx].focus();
      toggleActive[idx] = 'square' + ' _' + idx.toString();
      toggleActive[newIdx] = 'square active' + ' _' + newIdx.toString();
      this.setState({
        squareActive: toggleActive,
      });
    }
  }

  setComputer(state = null) {
    if (state === null) {
      this.setState({
        boardState: Array(9).fill(''),
        playAgainstComputer: !this.playAgainstComputer,
        xIsNext: true,
      });
    } else {
      this.setState({
        boardState: Array(9).fill(''),
        playAgainstComputer: state,
        xIsNext: true,
      });
    }
  }

  handleReset() {
    this.setState({
      boardState: Array(9).fill(''),
      isActiveGame: true,
    })
  }

  handleSquareClick(idx) {

    if (!this.state.isActiveGame) {
      return;
    }

    const board = this.state.boardState.slice();

    if (this.state.playAgainstComputer) {
      if (this.state.xIsNext) {
        if (board[idx]) {
          console.log('this has already been clicked');
          return;
        }
        board[idx] = 'x';

        this.setState({
          xIsNext: !this.state.xIsNext,
          boardState: board,
        }, () => {
          setTimeout(() => {
            const computersMove = findBestMove(board, 'o', 'x');
            board[computersMove] = 'o';

            this.setState({
              xIsNext: !this.state.xIsNext,
              boardState: board,
            });
          }, 500);
        });

      }
    } else {
      if (board[idx]) {
        console.log('this has already been clicked');
        return;
      }
      board[idx] = this.state.xIsNext ? 'x' : 'o';

      this.setState({
        xIsNext: !this.state.xIsNext,
        boardState: board,
      });
    }

    socket.emit('new state', board);

    console.log(board)
    if (utils.checkForWinner(board) || utils.checkForWinner(board) === false) {
      this.setState({
        isActiveGame: false
      })
      return;
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
        boardState: update,
        xIsNext: !this.state.xIsNext,
      });
    });
  }

  componentWillUnmount() {
    socket.off('connect');
    socket.off('disconnect');
    socket.off('message');
  }

  render() {
    var arrays = [];
    var divs = [];
    this.state.boardState.forEach((square, i) => {

      arrays.push(<Square
        {...(i === 0 ? {addFocus: 'autofocus'} : {})}
        key={i}
        value={this.state.boardState[i]}
        classname={this.state.squareActive[i]}
        onKeyDown={(e) => this.handleKeyDown(i, e)}
        onClick={() => this.handleSquareClick(i)}
      />)
      if ((i + 1) % 3 === 0) {
        divs.push(<div key={i} className="board-row" children={arrays.slice()}/>)
        arrays = []
      }
    });

    return (
      <div className="board-wrapper">
        <div className="nav-wrapper">
          <NavBar />
        </div>
        <div className="hud">
          <h3 className="turn-indicator">Current Player: {this.state.xIsNext ? 'X' : 'O'}</h3>
          <div className="opponent-selector">
            <h4 className="heading">Play against computer</h4>
            <button onClick={() => this.setComputer(true)} className={`btn ${this.state.playAgainstComputer && 'active'}`}>On</button>
            <button onClick={() => this.setComputer(false)} className={`btn ${!this.state.playAgainstComputer && 'active'}`}>Off</button>
          </div>
        </div>
        <div className="board">
          <div className="inner-board-wrapper">{divs}</div>
        </div>
        <div className={`controls ${this.state.isActiveGame}`}>
          <button className="btn" onClick={() => this.handleReset()}>Reset Game</button>
        </div>
      </div>
    );
  }
}
