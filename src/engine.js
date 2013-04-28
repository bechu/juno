var card = require("./card");
var hand = require("./hand");	
var deck = require("./deck");
var player = require("./player");

var Engine = function() {
	this.players = new Array();
	this.deck = new deck.Deck();
	this.game_started = false;
	this.heap = null;
}

Engine.prototype.IsStarted = function(name) {
	return this.game_started
}

Engine.prototype.AddPlayer  = function(name) {
  this.players.push(new player.Player(name));
  return this.players.length-1
}

Engine.prototype.RemovePlayer  = function(index) {
	this.players = this.players.slice(index+1, 1)
}

Engine.prototype.CountPlayer  = function() {
  return this.players.length
}

Engine.prototype.GetPlayer = function(index) {
	return this.players[index]
}

Engine.prototype.GetHeap = function() {
	return this.heap
}

Engine.prototype.DeckSize = function() {
	return this.deck.Size();
}

Engine.prototype.Deal = function() {
	this.game_started = true;
	this.deck.Reset();
	for(var i in this.players) {
		this.DealPlayer(i);
	}
	this.heap = this.deck.Deal(1);
}

Engine.prototype.DealPlayer = function(index) {
	var player = this.GetPlayer(index);
	var cards = this.deck.Deal(5);
	player.Reset();
	for(var i in cards)
		player.GetHand().Add(cards[i]);
}

Engine.prototype.RenderDeck = function() {
	var ret = "";
	if(this.heap != null)		
		ret +=  '<button class="btn btn-warning" type="button" onClick="pick();"><object data="'+this.heap.GetUri()+'" type="image/svg+xml"></object></button>';

		ret +=  '<button class="btn btn-info" type="button" onClick="pick();"><object data="/back/" type="image/svg+xml"></object> NB :  '+ this.DeckSize()+'</button>';
	
	return ret;
}

Engine.prototype.RenderPlayers = function() {
	var ret = "";
	for(var i in this.players)
	{
		var player = this.players[i];
		var p = "Nom : " + player.GetName() + " Count : " + player.GetHand().Size() + "<hr />";
		ret += p;
	}
	return ret;
}

Engine.prototype.RenderHand = function(index) {
	if(index < this.players.length) {
		var player = this.players[index];
		var hand = player.GetHand();
		if(hand.Changed() == false)
			return "";
		var ret = "";
		for(var i=0;i<hand.Size();i++)
		{
			var c = hand.Get(i);
			ret +=  '<button class="btn btn-info" type="button" onClick="play('+i+');"><object data="'+c.GetUri()+'" type="image/svg+xml"></object></button>';
		}
/*        ret += "<hr > <object data='"+c.GetUri()+"' type='image/svg+xml'></object>"; 
        ret += "<hr />";*/
		return ret;
	}
	return "";
}

module.exports.Engine = Engine;
