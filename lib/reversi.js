const Board = require('./board');
const util = require('./util');
const constants = require('./constants.json');

module.exports = {
  Board: Board,
  oppositeColor: util.oppositeColor,
  white: constants.white,
  black: constants.black,
  empty: constants.empty
};
