var chalk = require('chalk'),
    utils = require('./utils'),
    isWindows = utils.isWindows();

var constants = {
  MAP_WIDTH: 60,
  MAP_HEIGHT: 24,
  HORIZONTAL_WALL: isWindows ? '-' : '\u2509',
  VERTICAL_WALL: isWindows ? '|' : '\u2503',
  UPPER_LEFT_CORNER: isWindows ? '-' : '\u250F',
  UPPER_RIGHT_CORNER: isWindows ? '-' : '\u2513',
  LOWER_LEFT_CORNER: isWindows ? '-' : '\u2517',
  LOWER_RIGHT_CORNER: isWindows ? '-' : '\u251B',
  EMPTY_CELL: ' ',
  CHARACTER: isWindows 
    ? chalk.bold.yellow('@') 
    : chalk.bold.yellow('\u2603'),
  TREASURE: isWindows 
    ? chalk.white('$') 
    : chalk.white('\u2615'),
  BARRIER: isWindows
    ? chalk.gray('#')
    : chalk.gray('\u258A'),
  BARRIER_COUNT: 100,
  REFRESH_INTERVAL: 60
};

module.exports = constants;
