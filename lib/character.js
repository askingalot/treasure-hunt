var _ = require('lodash'),
    constants = require('./constants'),
    utils = require('./utils');

function initialCharacter(row, col) {
  return character = {
    row: row,
    col: col,
    icon: constants.CHARACTER
  };
}

function afterMovingNorth(character) {
  var newCharacter = _.cloneDeep(character);
  newCharacter.row -= 1;
  return newCharacter;
}

function afterMovingSouth(character) {
  var newCharacter = _.cloneDeep(character);
  newCharacter.row += 1;
  return newCharacter;
}

function afterMovingEast(character) {
  var newCharacter = _.cloneDeep(character);
  newCharacter.col += 1;
  return newCharacter;
}

function afterMovingWest(character) {
  var newCharacter = _.cloneDeep(character);
  newCharacter.col -= 1;
  return newCharacter;
}

function afterMovingRandomly(character) {
  var newCharacter = _.cloneDeep(character);
  var moves = [
    afterMovingNorth,
    afterMovingSouth,
    afterMovingEast,
    afterMovingWest
  ];

  var move = moves[utils.getRandomInt(moves.length)];
  return move(newCharacter);
}


module.exports = {
  initialCharacter: initialCharacter,
  afterMovingNorth: afterMovingNorth,
  afterMovingSouth: afterMovingSouth,
  afterMovingEast:  afterMovingEast,
  afterMovingWest:  afterMovingWest,
  afterMovingRandomly: afterMovingRandomly
}


