var card = require("./card");
var hand = require("./hand");	
var deck = require("./deck");
var player = require("./player");

var Engine = function() {
	this.players = new Array();
}

Engine.prototype.AddPlayer  = function(name) {
  this.players.push(new player.Player(name));
}

Engine.prototype.CountPlayer  = function() {
  return this.players.length;
}

module.exports.Engine = Engine;
