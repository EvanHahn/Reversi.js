const { white, black } = require('./constants.json');

module.exports = {

  oppositeColor: function oppositeColor(color) {
    if (color === white) {
      return black;
    } else if (color === black) {
      return white;
    } else {
      throw new Error('illegal color');
    }
  }

};
