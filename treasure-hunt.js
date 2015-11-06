var game = require('./lib/game'),
    actions = require('./lib/actions'),
    constants = require('./lib/constants'),
    utils = require('./lib/utils');

game.clearScreen();
var gameState = game.initialGameState();

var quitGameToken = setInterval(function() {
  gameState = executeFrame(gameState);

  if (game.isGameOver(gameState)) {
    console.log('YOU FOUND THE TREASURE!!!');
    clearInterval(quitGameToken);
  }

}, constants.REFRESH_INTERVAL);

function executeFrame(state) {
  var observation = game.observation(state),
      actionType = moveCharacter(observation),
      action = { type: actionType },
      newState = game.applyAction(state, action);

  game.display(newState);
  return newState;
}

function moveCharacter(observation) {
  var obs = observation;
  var randomize = function() { return Math.random() >= 0.5; };
  var treasureIs = {
    north: obs.isTreasureNorth() && 
           !obs.isTreasureEast() && !obs.isTreasureWest(),
    south: obs.isTreasureSouth() && 
           !obs.isTreasureEast() && !obs.isTreasureWest(),
    east: obs.isTreasureEast() && 
          !obs.isTreasureNorth() && !obs.isTreasureSouth(),
    west: obs.isTreasureWest() && 
          !obs.isTreasureNorth() && !obs.isTreasureSouth(),
    northEast: obs.isTreasureNorth() && obs.isTreasureEast(),
    northWest: obs.isTreasureNorth() && obs.isTreasureWest,
    southEast: obs.isTreasureSouth() && obs.isTreasureEast(),
    southWest: obs.isTreasureSouth() && obs.isTreasureWest()
  };

  if (randomize()) {
    if (treasureIs.north && obs.isNorthClear()) {
      return actions.types.MOVE_NORTH;
    }
    if (treasureIs.south && obs.isSouthClear()) {
      return actions.types.MOVE_SOUTH;
    }
    if (treasureIs.east && obs.isEastClear()) {
      return actions.types.MOVE_EAST;
    }
    if (treasureIs.west && obs.isWestClear()) {
      return actions.types.MOVE_WEST;
    }
  }

  if (treasureIs.northEast) {
    if (obs.isEastClear() && randomize()) {
      return actions.types.MOVE_EAST;
    }
    if (obs.isNorthClear() && randomize()) {
      return actions.types.MOVE_NORTH;
    }
  }
  if (treasureIs.northWest) {
    if (obs.isWestClear() && randomize()) {
      return actions.types.MOVE_WEST;
    }
    if (obs.isNorthClear() && randomize()) {
      return actions.types.MOVE_NORTH;
    }
  }
  if (treasureIs.southEast) {
    if (obs.isEastClear() && randomize()) {
      return actions.types.MOVE_EAST;
    }
    if (obs.isSouthClear() && randomize()) {
      return actions.types.MOVE_SOUTH;
    }
  }
  if (treasureIs.southWest) {
    if (obs.isWestClear() && randomize()) {
      return actions.types.MOVE_WEST;
    }
    if (obs.isSouthClear() && randomize()) {
      return actions.types.MOVE_SOUTH;
    }
  }

  return actions.types.MOVE_RANDOM;
}

