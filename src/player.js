var hand = require("./hand");

var Player = function(name) {
  this.name = name;
  this.hand = new hand.Hand();
}

Player.prototype.GetName  = function() {
  return this.name;
}

Player.prototype.GetHand  = function() {
  return this.hand;
}

Player.prototype.Reset = function() {
  this.hand.Reset();
}

module.exports.Player = Player;
