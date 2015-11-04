var constants = require('./constants');

function initialTreasure(row, col) {
  return character = {
    row: row,
    col: col,
    icon: constants.TREASURE
  };
}

module.exports = {
  initialTreasure: initialTreasure
};
