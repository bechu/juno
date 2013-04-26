var card = require("./card");
var hand = require("./hand");	
var deck = require("./deck");
var player = require("./player");

var Engine = function() {
	this.players = new Array();
	this.deck = new deck.Deck();
	this.game_started = false;
}

Engine.prototype.IsStarted = function(name) {
	return this.game_started
}

Engine.prototype.AddPlayer  = function(name) {
  this.players.push(new player.Player(name));
  return this.players.length-1
}

Engine.prototype.CountPlayer  = function() {
  return this.players.length
}

Engine.prototype.GetPlayer = function(index) {
	return this.players[index]
}

Engine.prototype.Deal = function() {
	this.game_started = true;
	for(var i in this.players)
		this.DealPlayer(i);
}

Engine.prototype.DealPlayer = function(index) {
	var player = this.GetPlayer(index);
	var cards = this.deck.Deal(5);
	for(var i in cards)
		player.GetHand().Add(cards[i]);
}

Engine.prototype.RenderPlayers = function(index) {
	var ret = "";
	for(var i in this.players)
	{
		var player = this.players[i];
		var p = "Nom : " + player.GetName() + " Count : " + player.GetHand().Size() + "<hr />";
		ret += p;
	}
	return ret;
}

module.exports.Engine = Engine;
