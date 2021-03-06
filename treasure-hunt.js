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
  return actions.types.MOVE_RANDOM;
}

