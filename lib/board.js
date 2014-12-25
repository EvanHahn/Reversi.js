const util = require('./util');
const { white, black, empty, boardSize } = require('./constants.json');

// Check in a direction. For example, if rowAdd was 1 and colAdd was 0, this
// would check legality to the right. If rowAdd was -1 and colAdd was 1, this
// would check legality down and to the left.
function checkDirection(board, row, col, color, rowAdd, colAdd) {
  const oppositeColor = util.oppositeColor(color);
  let i = row + rowAdd;
  let j = col + colAdd;
  if ((!board.inBounds(i, j)) || (board.get(i, j) !== oppositeColor)) {
    return false;
  }
  for (i += rowAdd, j += colAdd; board.inBounds(i, j); i += rowAdd, j += rowAdd) {
    const tile = board.get(i, j);
    if (tile === empty) {
      return false;
    } else if (tile === color) {
      return true;
    }
  }
  return false;
}

class Board {

  constructor(options = {}) {

    this.turn = black;
    this._board = [];
    this.clear();

    if (!options.empty) {
      this.set(3, 4, black, { force: true });
      this.set(4, 3, black, { force: true });
      this.set(3, 3, white, { force: true });
      this.set(4, 4, white, { force: true });
    }

  }

  get(row, col) {
    return this._board[row][col];
  }

  set(row, col, color, options = {}) {
    if (options.force) {
      this._board[row][col] = color;
      this.turn = util.oppositeColor(color);
    }
  }

  inBounds(row, col = 0) {
    return (
      (row >= 0) && (col >= 0) &&
      (row < boardSize) && (col < boardSize)
    );
  }

  checkLegal(row, col, color = this.turn) {
    if ((!this.inBounds(row, col)) || (this.get(row, col) !== empty)) {
      return false;
    }
    for (let i = -1; i <= 1; i ++) {
      for (let j = -1; j <= 1; j ++) {
        if (!((i === 0) && (j === 0)) &&
            checkDirection(this, row, col, color, i, j)) {
          return true;
        }
      }
    }
    return false;
  }

  legalMovesFor(color = this.turn) {
    let result = [];
    for (let i = 0; i < boardSize; i ++) {
      for (let j = 0; j < boardSize; j ++) {
        if (this.checkLegal(i, j, color)) {
          result.push([i, j]);
        }
      }
    }
    return result;
  }

  isGameOver() {
    const whiteMoves = this.legalMovesFor(white).length;
    const blackMoves = this.legalMovesFor(black).length;
    return whiteMoves || blackMoves;
  }

  clear() {
    this._board.length = 0;
    for (let i = 0; i < boardSize; i ++) {
      let row = [];
      for (let j = 0; j < boardSize; j ++) {
        row.push(empty);
      }
      this._board.push(row);
    }
    return this;
  }

  toString() {
    let result = [
      '    0   1   2   3   4   5   6   7',
      '   _______________________________'
    ];
    for (let row = 0; row < boardSize; row ++) {
      let rowResult = row + ' |';
      for (let col = 0; col < boardSize; col ++) {
        const tile = this.get(row, col);
        let value = ' ';
        if (tile === white) {
          value = 'O';
        } else if (tile === black) {
          value = 'X';
        }
        rowResult += ` ${value} |`;
      }
      result.push(rowResult);
      result.push('  |---+---+---+---+---+---+---+---|');
    }
    result.pop();
    result.push('   -------------------------------');
    return result.join('\n');
  }

}

module.exports = Board;
