import React from 'react';
import Square from './Square';
import * as utils from '../utils/functions';
import CookieStorage from '../utils/CookieStorage';

const SAVE_DATA_NAME = 'game:tic-tac-toe';
const DEFAULT_SAVE_STATE = Array(9).fill('');

export class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    const squareArray = this.getSaveData();
    const isXNext = utils.isXNext(squareArray);
    this.state = { squareArray, isXNext };
  }

  setSaveData(squares) {
    CookieStorage.setCookie(SAVE_DATA_NAME, JSON.stringify(squares));
  }

  getSaveData() {
    const SaveData = CookieStorage.getCookie(SAVE_DATA_NAME);
    return SaveData === null ? DEFAULT_SAVE_STATE : JSON.parse(SaveData);
  }

  clearSaveData() {
    CookieStorage.removeCookie(SAVE_DATA_NAME);
    const squareArray = DEFAULT_SAVE_STATE;
    const isXNext = utils.isXNext(squareArray);
    this.setState({ squareArray, isXNext });
  }

  handleSquareClick(num) {
    const squares = this.state.squareArray.slice();

    if (squares[num]) {
      console.log('this has already been clicked');
      return;
    }

    squares[num] = this.state.isXNext ? 'x' : 'o';

    this.setState(
      {
        squareArray: squares,
        isXNext: !this.state.isXNext,
      },
      this.setSaveData(squares),
    );

    if (utils.checkForWinner(squares)) {
      return;
    }
  }

  render() {
    return (
      <div className="board-wrapper">
        <div className="hud">
          <h3 className="turn-indicator">Current Player: {this.state.isXNext ? 'X' : 'O'}</h3>
          <button onClick={() => this.clearSaveData()}>Reset Game</button>
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
