import React from 'react';
import Slot from './Slot';
import helpers from './Helpers';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [
        ['', '', '', '', '', '', ''], ['', '', '', '', '', '', ''], ['', '', '', '', '', '', ''], ['', '', '', '', '', '', ''], ['', '', '', '', '', '', ''], ['', '', '', '', '', '', '']
      ],
      redIsNext: false,
      isActiveGame: true,
    }
    this.addPiece = this.addPiece.bind(this);
  }

  addPiece(index) {

    if (this.state.isActiveGame) {

      if (this.state.board[0][index] === '') {

        let result = helpers.addPiece(index, this.state.board);

        let newBoard = this.state.board.slice();

        newBoard[result][index] = this.state.redIsNext ? 'red' : 'black';

        this.setState({
          board: newBoard,
          redIsNext: !this.state.redIsNext
        });

        let color = !this.state.redIsNext ? 'black' : 'red';

        if (helpers.checkForWinner(this.state.board, color, result, index)) {
          console.log('winner is', color);
          this.setState({
            isActiveGame: false,
          });
          this.props.declareWinner(color);
        };
      }
    }
  }

  render() {

    return (

      <div className="board">
      {this.state.board.map((row, i) => {
        return row.map((column, j) => {
          let hasPiece = this.state.board[i][j];
          if (i === 0) {
            return <Slot entry={j + 1} addPiece={this.addPiece} hasPiece={hasPiece}/>
          } else {
            return <Slot hasPiece={hasPiece}/>
          }
        })
      })}
      </div>

    )
  }

}

export default Board;