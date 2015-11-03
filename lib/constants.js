var chalk = require('chalk');

var constants = {
  MAP_WIDTH: 120,
  MAP_HEIGHT: 30,
  HORIZONTAL_WALL: '\u2509',
  VERTICAL_WALL: "\u2503",
  UPPER_LEFT_CORNER: '\u250F',
  UPPER_RIGHT_CORNER: '\u2513',
  LOWER_LEFT_CORNER: '\u2517',
  LOWER_RIGHT_CORNER: '\u251B',
  EMPTY_CELL: ' ',
  CHARACTER: chalk.blue('\u2603'),
  TREASURE: chalk.white('\u2615'),
  BARRIER: chalk.gray('\u258A'),
  /*
  CHARACTER: chalk.blue('@'),
  TREASURE: '$',
  BARRIER: chalk.red('='),
  */
  BARRIER_COUNT: 50
};

module.exports = constants;
