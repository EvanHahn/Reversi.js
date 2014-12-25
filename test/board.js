const Reversi = require('..');
const Board = Reversi.Board;
const { white, black, empty } = Reversi;

const assert = require('assert');

describe('board', () => {

  it('is initialized properly', () => {
    const board = new Board();
    for (let row = 0; row < 8; row ++) {
      for (let col = 0; col < 8; col ++) {
        let piece = board.get(row, col);
        if (((row === 3) && (col === 3)) ||
            ((row === 4) && (col === 4))) {
          assert.equal(piece, white);
        } else if (((row === 3) && (col === 4)) ||
                   ((row === 4) && (col === 3))) {
          assert.equal(piece, black);
        } else {
          assert.equal(piece, empty);
        }
      }
    }
  });

  it('can be initialized empty', () => {
    const board = new Board({ empty: true });
    for (let i = 0; i < 8; i ++) {
      for (let j = 0; j < 8; j ++) {
        assert.equal(board.get(i, j), empty);
      }
    }
  });

  describe('inBounds', () => {

    let board;
    beforeEach(() => { board = new Board(); });

    it('correctly detects things in bounds', () => {
      for (let i = 0; i < 8; i ++) {
        for (let j = 0; j < 8; j ++) {
          assert(board.inBounds(i, j));
        }
      }
    });

    it('correctly detects out of bounds', () => {
      for (let i = -10; i < 0; i ++) {
        for (let j = 0; j < 8; j ++) {
          assert(!board.inBounds(i, j));
        }
      }
      for (let i = 8; i < 18; i ++) {
        for (let j = 0; j < 8; j ++) {
          assert(!board.inBounds(i, j));
        }
      }
      for (let i = 0; i < 8; i ++) {
        for (let j = -10; j < 0; j ++) {
          assert(!board.inBounds(i, j));
        }
      }
      for (let i = 0; i < 8; i ++) {
        for (let j = 8; j < 18; j ++) {
          assert(!board.inBounds(i, j));
        }
      }
    });

  });

  describe('checkLegal', () => {

    let board;
    beforeEach(() => { board = new Board(); });

    it('knows when squares are legal', () => {
      assert(board.checkLegal(2, 3, black));
      assert(board.checkLegal(2, 4, white));
      assert(board.checkLegal(3, 2, black));
      assert(board.checkLegal(4, 5, black));
      assert(board.checkLegal(5, 4, black));
    });

    it('knows occupied squares are illegal', () => {
      [white, black].forEach(color => {
        assert(!board.checkLegal(3, 3, color));
        assert(!board.checkLegal(3, 4, color));
        assert(!board.checkLegal(4, 3, color));
        assert(!board.checkLegal(4, 4, color));
      });
    });

    it('knows which squares are illegal for the color', () => {
      assert(!board.checkLegal(2, 3, white));
      assert(!board.checkLegal(2, 4, black));
      assert(!board.checkLegal(3, 2, white));
      assert(!board.checkLegal(4, 5, white));
      assert(!board.checkLegal(5, 4, white));
    });

    it('knows faraway squares are illegal', () => {
      [white, black].forEach(color => {
        assert(!board.checkLegal(0, 0, color));
        assert(!board.checkLegal(1, 1, color));
        assert(!board.checkLegal(0, 7, color));
        assert(!board.checkLegal(7, 0, color));
        assert(!board.checkLegal(7, 7, color));
      });
    });

  });

  describe('toString', () => {

    it('generates an ASCII board', () => {
      const actual = new Board().toString();
      const expected = [
        '    0   1   2   3   4   5   6   7',
        '   _______________________________',
        '0 |   |   |   |   |   |   |   |   |',
        '  |---+---+---+---+---+---+---+---|',
        '1 |   |   |   |   |   |   |   |   |',
        '  |---+---+---+---+---+---+---+---|',
        '2 |   |   |   |   |   |   |   |   |',
        '  |---+---+---+---+---+---+---+---|',
        '3 |   |   |   | O | X |   |   |   |',
        '  |---+---+---+---+---+---+---+---|',
        '4 |   |   |   | X | O |   |   |   |',
        '  |---+---+---+---+---+---+---+---|',
        '5 |   |   |   |   |   |   |   |   |',
        '  |---+---+---+---+---+---+---+---|',
        '6 |   |   |   |   |   |   |   |   |',
        '  |---+---+---+---+---+---+---+---|',
        '7 |   |   |   |   |   |   |   |   |',
        '   -------------------------------'
      ].join('\n');
      assert.equal(actual, expected);
    });

  });

});
