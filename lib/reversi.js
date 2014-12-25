const Board = require('./board');
const constants = require('./constants.json');

module.exports = {
  Board: Board,
  white: constants.white,
  black: constants.black,
  empty: constants.empty
};
