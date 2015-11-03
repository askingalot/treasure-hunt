var game = require('./lib/game'),
    character = require('./lib/character'),
    actions = require('./lib/actions'),
    utils = require('./lib/utils');

var gameState = game.initialGameState();

setInterval(function() {
  gameState = executeFrame(gameState);
}, 1000);

function executeFrame(state) {
  var actionType = utils.getRandomPropertyValue(actions.types),
      action = { type: actionType },
      newState = game.applyAction(state, action);

  game.display(newState);
  return newState;
}

