var _ = require('lodash'),
    constants = require('./constants'),
    utils = require('./utils'),
    character = require('./character'),
    barrier = require('./barrier'),
    actions = require('./actions');

function clearScreen() {
  process.stdout.write("\u001b[2J\u001b[0;0H");
}

function copyMap(map) {
  return map.map(function(row) {
    return row.map(function(cell) {
      return cell;
    });
  });
}

function withHello(map) {
  var newMap = copyMap(map),
      midRow = newMap.length / 2,
      midCol = newMap[0].length / 2,
      hello = ['h','e','l','l','o'];

  [].splice.apply(newMap[midRow], 
                  [midCol-3, 5].concat('hello'.split('')));

  return newMap;
}

function withBorders(map) {
  var newMap = copyMap(map)
      firstRow = 0,
      firstCol = 0,
      lastRow = newMap.length - 1,
      lastCol = newMap[0].length - 1;

  [firstRow, lastRow].forEach(function (rowIndex) {
    newMap[rowIndex] = newMap[rowIndex].map(function(_cell) {
      return constants.HORIZONTAL_WALL;
    });
  });
  newMap.forEach(function(row) {
    [firstCol, lastCol].forEach(function (colIndex) {
      row[colIndex] = constants.VERTICAL_WALL;
    });
  });
  newMap[firstRow][firstCol] = constants.UPPER_LEFT_CORNER;
  newMap[firstRow][lastCol] = constants.UPPER_RIGHT_CORNER;
  newMap[lastRow][firstCol] = constants.LOWER_LEFT_CORNER;
  newMap[lastRow][lastCol] = constants.LOWER_RIGHT_CORNER;

  return newMap;
}

function isWithinBounds(map, position) {
  var firstRow = 1,
      firstCol = 1,
      lastRow = map.length - 2,
      lastCol = map[0].length - 2;

  return (position.row >= firstRow &&
          position.row <= lastRow  &&
          position.col >= firstCol &&
          position.col <= lastCol);
}

function isFreeOfBarriers(barriers, position) {
  return barriers.every(function (barrier) {
    return !(barrier.row === position.row && barrier.col === position.col);
  });
}

/*****************************************************/

function initialGameState() {
  var map = _.range(constants.MAP_HEIGHT).map(function(_i) {
        return _.range(constants.MAP_WIDTH).map(function(_j) {
          return constants.EMPTY_CELL;
        });
      }),
      barriers = _.range(constants.BARRIER_COUNT).map(function(_i) {
        return barrier.somewhereBetween({ row: 0, col: 0 }, 
                                        { row: constants.MAP_HEIGHT,
                                          col: constants.MAP_WIDTH });
      }),
      initCharacter = character.initialCharacter(
        utils.getRandomInt(1, constants.MAP_HEIGHT - 2),
        utils.getRandomInt(1, constants.MAP_WIDTH - 2)
      ),
      treasure = {
        row: utils.getRandomInt(1, constants.MAP_HEIGHT - 2),
        col: utils.getRandomInt(1, constants.MAP_WIDTH - 2),
        icon: constants.TREASURE
      };


  var decoratedMap = withBorders( withHello( map ) );

  barriers.forEach(function (barrier) {
    decoratedMap[barrier.row][barrier.col] = barrier.icon;
  });
  decoratedMap[treasure.row][treasure.col] = treasure.icon;
  decoratedMap[initCharacter.row][initCharacter.col] = initCharacter.icon;

  return {
    map: decoratedMap,
    barriers: barriers,
    character: initCharacter,
    treasure: treasure
  };
}


function applyAction(gameState, action) {
  if (! actions.types[action.type]) {
    return gameState;
  }

  var cActions = {};
  cActions[actions.types.MOVE_NORTH] = character.afterMovingNorth,
  cActions[actions.types.MOVE_SOUTH] = character.afterMovingSouth,
  cActions[actions.types.MOVE_EAST]   =  character.afterMovingEast,
  cActions[actions.types.MOVE_WEST]   =  character.afterMovingWest

  var map = gameState.map,
      barriers = gameState.barriers,
      oldCharacter = gameState.character,
      newCharacter = cActions[action.type](oldCharacter);

  if (! isWithinBounds(map, newCharacter) ||
      ! isFreeOfBarriers(barriers, newCharacter)) {
    return gameState;
  }

  var newMap = copyMap(map),
      oldRow = oldCharacter.row,
      oldCol = oldCharacter.col;
      newRow = newCharacter.row,
      newCol = newCharacter.col;

  newMap[newRow][newCol] = newCharacter.icon;
  newMap[oldRow][oldCol] = constants.EMPTY_CELL;

  return {
    map: newMap,
    character: newCharacter,
    treasure: gameState.treasure,
    barriers: gameState.barriers
  };
}

function display(gameState) {
  clearScreen();
  gameState.map.forEach(function(row) {
    console.log(row.join(''));
  });
}

function isGameOver(gameState) {
  return gameState.character.row === gameState.treasure.row &&
         gameState.character.col === gameState.treasure.col;
}

module.exports = {
  initialGameState: initialGameState,
  display: display,
  applyAction: applyAction,
  isGameOver: isGameOver
}



