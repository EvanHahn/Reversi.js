Reversi.js
==========

[Reversi](https://en.wikipedia.org/wiki/Reversi) logic in JavaScript.

**Not finished!!**

Basic usage:

```js
var board = new Reversi.Board()

board.toString()
/*  0   1   2   3   4   5   6   7
   _______________________________
0 |   |   |   |   |   |   |   |   |
  |---+---+---+---+---+---+---+---|
1 |   |   |   |   |   |   |   |   |
  |---+---+---+---+---+---+---+---|
2 |   |   |   |   |   |   |   |   |
  |---+---+---+---+---+---+---+---|
3 |   |   |   | O | X |   |   |   |
  |---+---+---+---+---+---+---+---|
4 |   |   |   | X | O |   |   |   |
  |---+---+---+---+---+---+---+---|
5 |   |   |   |   |   |   |   |   |
  |---+---+---+---+---+---+---+---|
6 |   |   |   |   |   |   |   |   |
  |---+---+---+---+---+---+---+---|
7 |   |   |   |   |   |   |   |   |
   -------------------------------  */

board.get(0, 0)  // "empty"
board.get(3, 3)  // "white"
board.get(3, 4)  // "black"

board.turn   // "black"

board.isLegal(3, 2, "black")  // true
board.isLegal(3, 2, "white")  // false
board.isLegal(4, 2, "white")  // true

// more to come...
```
