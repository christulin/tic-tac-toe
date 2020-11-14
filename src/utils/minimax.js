const anyElementsEqual = (array, val) => array.some(element => element === val);
const allElementsEqual = (array, val) => array.every(element => element === val);

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

    const winningPlayer = line[0];
    const isWinner = allElementsEqual(line, winningPlayer);

    if (isWinner) {
      if (winningPlayer === player) {
        return 10;
      } else if (winningPlayer === opponent) {
        return -10;
      }
    }
  }

  return 0;
};

const hasMovesLeft = board => anyElementsEqual(board, '');

const minimax = (board, depth, isMax, player = 'x', opponent = 'o', alpha = Number.NEGATIVE_INFINITY, beta = Number.POSITIVE_INFINITY) => {
  const score = evaluate(board, player, opponent);

  // If it a winning or losing board, return the score
  // weighted by depth
  if (score === 10) {
    return score - depth;
  }

  if (score === -10) {
    return score + depth;
  }

  // If the game is a draw, return a neutral score
  if (!hasMovesLeft(board)) return 0;

  // Get best score for the maximizer
  if (isMax) {
    let best = Number.NEGATIVE_INFINITY;

    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        board[i] = player;
        best = Math.max(best, minimax(board, depth + 1, !isMax, player, opponent, alpha, beta));
        board[i] = '';

        alpha = Math.max(alpha, best);
        if (beta <= alpha) break;
      }
    }

    return best;

  // Get the best score for the minimizer
  } else {
    let best = Number.POSITIVE_INFINITY;

    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        board[i] = opponent;
        best = Math.min(best, minimax(board, depth + 1, !isMax, player, opponent, alpha, beta));
        board[i] = '';

        beta = Math.min(beta, best);
        if (beta <= alpha) break;
      }
    }

    return best;
  }
};

const findBestMove = (board, player = 'x', opponent = 'o') => {
  let bestVal = Number.NEGATIVE_INFINITY;
  let bestMove = -1;

  // For every empty cell get the value
  // to find the highest possible value
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      board[i] = player;
      const moveVal = minimax(board, 0, false, player, opponent);
      board[i] = '';

      if (moveVal > bestVal) {
        bestMove = i;
        bestVal = moveVal;
      }
    }
  }

  return bestMove;
};

export default findBestMove;
