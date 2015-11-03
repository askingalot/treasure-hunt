var utils = require('./utils'),
    constants = require('./constants');

function somewhereBetween(upperLeft, lowerRight) {
  var row = utils.getRandomInt(upperLeft.row + 1, lowerRight.row - 1),
      col = utils.getRandomInt(upperLeft.col + 1, lowerRight.col - 1);

  return {
    row: row,
    col: col,
    icon: constants.BARRIER
  }
}

module.exports = {
  somewhereBetween: somewhereBetween
};
