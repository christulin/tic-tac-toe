const helpers = {

  addPiece(index, board) {

    for (let i = 0; i < board.length; i++) {

      if (board[i][index]) {
        return (i - 1)
      } else if (i === 5) {
        return i;
      }
    }
  },

  checkVertical(board, color, column) {

    let count = 0;

    for (let i = 0; i < board.length; i ++) {
      if (board[i][column] === color) {
        count += 1;
        if (count === 4) {
          return true
        }
      } else {
        count = 0;
      }
    }

    return false;

  },

  checkHorizontal(board, color, row) {

    let count = 0;

    for (let i = 0; i < board[row].length; i++) {
      if (board[row][i] === color) {
        count += 1;
        if (count === 4) {
          return true
        }
      } else {
        count = 0;
      }
    }

    return false;

  },

  checkDiagonals(board, color, column, row) {

    const checkRight = () => {

      let beginning;
      let beginningColumn = column;

        for (let i = row; i < 6; i++) {
          if (i === 5) {
            beginning = [i, beginningColumn];
            break;
          } else if (beginningColumn === 0 ) {
            beginning = [i, beginningColumn];
            break;
          } else {
            beginningColumn -= 1;
          }
        }

      let currentRow = beginning[0];
      let currentColumn = beginning[1];
      let count = 0;

      for (let i = currentRow; i >= 0; i--) {
        if (board[currentRow]) {
          if (board[currentRow][currentColumn] === color) {
            count += 1;
            if (count === 4) {
              return true;
            }
          } else {
            count = 0;
          }
          currentRow -= 1;
          currentColumn += 1
        } else {
          return false;
        }
      }

      return false;

    }

    const checkLeft = () => {

      let beginning;
      let beginningColumn = column;

      for (let i = row; i < 6; i++) {
        if (i === 5) {
          beginning = [i, beginningColumn];
          break;
        } else if (beginningColumn === 6 ) {
          beginning = [i, beginningColumn];
          break;
        } else {
          beginningColumn += 1;
        }
      }

      let currentRow = beginning[0];
      let currentColumn = beginning[1];
      let count = 0;

      for (let i = currentRow; i >= 0; i--) {
        if (board[currentRow]) {
          if (board[currentRow][currentColumn] === color) {
            count += 1;
            if (count === 4) {
              return true;
            }
          } else {
            count = 0;
          }
          currentRow -= 1;
          currentColumn -= 1
        } else {
          return false;
        }
      }

      return false;

    }

    return checkLeft() || checkRight() ? true : false;

  },

  checkForWinner(board, color, row, column) {

    if (this.checkVertical(board, color, column) || this.checkHorizontal(board, color, row) || this.checkDiagonals(board, color, column, row)) {
      return true;
    } else {
      return false;
    }

  }

}

export default helpers