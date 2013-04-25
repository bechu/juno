
var Player = function(name) {
  this.name = name;
}

Player.prototype.toString  = function() {
  return this.name;
}

module.exports.Player = Player;

