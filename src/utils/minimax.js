const board = ['', '', '', '', '', '', '', '', ''];

const anyElementsEqual = (array, val) => array.some(element => element === val);
const allElementsEqual = (array, val) => array.every(element => element === val);
const hasMovesLeft = board => allElementsEqual(board, '');

const getLines = board => {
  const n = Math.ceil(Math.sqrt(board.length));

  const lines = {
    rows: [],
    cols: [],
    lDiag: [],
    rDiag: [],
  };

  for (let i = 0, row = -1; i < board.length; i++) {
    const move = board[i];
    const col = i % n;
    if (col === 0) row++;

    if (row === col) lines.lDiag.push(move);
    if (row + col === n - 1) lines.rDiag.push(move);

    if (!lines.rows[row]) lines.rows[row] = [];
    if (!lines.cols[col]) lines.cols[col] = [];

    lines.rows[row].push(move);
    lines.cols[col].push(move);
  }

  const allLines = [];

  for (let key in lines) {
    if (Array.isArray(lines[key][0])) {
      for (let subline of lines[key]) {
        allLines.push(subline);
      }
    } else {
      allLines.push(lines[key]);
    }
  }

  return allLines;
};

const evaluate = (board, player, opponent) => {
  const lines = getLines(board);

  for (let line of lines) {
    if (line[0] === '') continue;

    const currentPlayer = line[0];
    const isWinner = allElementsEqual(line, currentPlayer);

    if (isWinner) {
      if (currentPlayer === player) {
        return 10;
      } else if (currentPlayer === opponent) {
        return -10;
      }
    }
  }

  return 0;
};

//console.log(evaluate(['x', 'x', '', 'o', 'x', 'o', 'o', 'x', ''], 'x', 'o'));

const minimax = board => {

};
