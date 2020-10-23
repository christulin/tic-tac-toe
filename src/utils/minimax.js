const board = ['', '', '', '', '', '', '', '', ''];

const arrayToMatrix = array => {
  const n = Math.ceil(Math.sqrt(array.length));
  const matrix = [];
  for (let i = 0, j = -1; i < array.length; i++) {
    if (i % n === 0) {
      j++;
      matrix[j] = [];
    }
    matrix[j].push(array[i]);
  }
  return matrix;
};

const hasMovesLeft = board => board.reduce((acc, val) => val === '' ? true : acc, false);
const hasMovesLeftMatrix = board => board.flat().reduce((acc, val) => val === '' ? true : acc, false);

const evaluate = (board, player, opponent) => {
  const n = Math.ceil(Math.sqrt(board.length));
  for (let i = 0, j = -1; i < board.length; i++) {
    if (i % n === 0) j++;
  }
};

const minimax = board => {

};
