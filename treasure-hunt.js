var game = require('./lib/game'),
    actions = require('./lib/actions'),
    utils = require('./lib/utils');

var gameState = game.initialGameState();

var quitGameToken = setInterval(function() {
  gameState = executeFrame(gameState);

  if (game.isGameOver(gameState)) {
    console.log('YOU FOUND THE TREASURE!!!');
    clearInterval(quitGameToken);
  }

}, 500);

function executeFrame(state) {
  var actionType = utils.getRandomPropertyValue(actions.types),
      action = { type: actionType },
      newState = game.applyAction(state, action);

  game.display(newState);
  return newState;
}

