const { white, black, empty, boardSize } = require('./constants.json');

class Board {

  constructor(options = {}) {

    this._board = [];
    this.clear();

    if (!options.empty) {
      this.set(3, 3, white, { force: true });
      this.set(4, 4, white, { force: true });
      this.set(3, 4, black, { force: true });
      this.set(4, 3, black, { force: true });
    }

  }

  get(row, col) {
    return this._board[row][col];
  }

  set(row, col, value, options = {}) {
    if (options.force) {
      this._board[row][col] = value;
    }
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

}

module.exports = Board;
