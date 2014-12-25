const Reversi = require('..');
const Board = Reversi.Board;

const assert = require('assert');

describe('board', () => {

  it('is initialized properly', () => {
    const board = new Board();
    for (let row = 0; row < 8; row ++) {
      for (let col = 0; col < 8; col ++) {

        let piece = board.get(row, col);
        if (((row === 3) && (col === 3)) ||
            ((row === 4) && (col === 4))) {
          assert.equal(piece, Reversi.white);
        } else if (((row === 3) && (col === 4)) ||
                   ((row === 4) && (col === 3))) {
          assert.equal(piece, Reversi.black);
        } else {
          assert.equal(piece, Reversi.empty);
        }

      }
    }
  });

  it('can be initialized empty', () => {
    const board = new Board({ empty: true });
    for (let i = 0; i < 8; i ++) {
      for (let j = 0; j < 8; j ++) {
        assert.equal(board.get(i, j), Reversi.empty);
      }
    }
  });

});
