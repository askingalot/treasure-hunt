var utils = {
  getRandomInt: function(min, max) {
    if (max === undefined) {
      max = min;
      min = 0;
    }
    return Math.floor(Math.random() * (max - min)) + min;
  },
  getRandomPropertyValue: function (obj) {
    var keys = Object.keys(obj),
        randomKey = keys[Math.floor(Math.random() * keys.length)];

    return obj[randomKey];
  },
  isWindows: function() {
    return /^win/.test(process.platform);
  }
};

module.exports = utils;
