var card = require("./card");
var hand = require("./hand");	
var deck = require("./deck");
var player = require("./player");

var Engine = function() {
	this.players = new Array();
	this.deck = new deck.Deck();
	this.game_started = false;
	this.heap = new Array();
	this.heam_changed = true;
	this.player = -1;
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
	this.heap.push(this.deck.Deal(1));
	this.player = 0;
}

Engine.prototype.DealPlayer = function(index) {
	var player = this.GetPlayer(index);
	var cards = this.deck.Deal(5);
	player.Reset();
	for(var i in cards)
		player.GetHand().Add(cards[i]);
}


Engine.prototype.GetNextPlayer = function() {
	this.player = this.player + 1;
	if(this.player > this.players.length-1) {
		this.player = 0;
	}
}

Engine.prototype.Play = function(index) {
	var c = this.players[this.player].GetHand().Get(index);
	if(c == null)
		return "Cette carte n'existe pas !";
	if(this.heap[this.heap.length-1].IsCompatible(c) == false)
		return "Tu ne peux pas jouer avec cette carte !";
	this.heap.push(c);
	this.players[this.player].GetHand().Remove(index);
	//this.GetNextPlayer();
	this.heam_changed = true;
	return "well"
}

Engine.prototype.Pick = function(index) {
	if(index < this.players.length) {
		var player = this.players[index];
		var hand = player.GetHand();
		var card = this.deck.Deal(1);
		player.GetHand().Add(card);
		this.heam_changed = true;
	}
	return "";
}


Engine.prototype.RenderDeck = function() {
	if(this.heap.length != 0)
		return this.heap[this.heap.length-1].GetUri();
	/*
		ret +=  '<button class="btn btn-warning" type="button" onClick="pick();"><object data="'+this.heap[this.heap.length-1].GetUri()+'" type="image/svg+xml"></object></button>';

		ret +=  '<button class="btn btn-info" type="button" onClick="pick();"><object data="/back/" type="image/svg+xml"></object> NB :  '+ this.DeckSize()+'</button>';
*/
	
	return "/back/";
}

Engine.prototype.RenderPlayers = function() {
	// on affiche un tableau avec l'état des joueurs !

	var ret = '<table class="table"><thead><tr> \
                  <th>#</th> \
                  <th>Nom</th> \
                  <th>Carte</th> \
                  <th>Action</th> \
                </tr> \
              </thead> \
              <tbody>';

    var p = this.players[this.player];
	for(var i in this.players)
	{
		var player = this.players[i];
		if(p != null) {
			if(p.GetName() == player.GetName())
				ret += '<tr class="error"> \
                  <td><i class="icon-heart"></i></td> \
                  <td><span class="label label-important">'+player.GetName()+'</span></td> \
                  <td><span class="label label-important">'+player.GetHand().Size()+'</span></td> \
                  <td>@</td> \
                </tr>';
		else
		ret += '<tr> \
                  <td><i class="icon-heart"></i></td> \
                  <td>'+player.GetName()+'</td> \
                  <td>'+player.GetHand().Size()+'</td> \
                  <td>@</td> \
                </tr>';
            }
	}
	ret += "</tbody></table>";
	return ret;
}//<span class="label label-important">Important</span>

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
			ret += c.Render(i);
		}
		return ret;
	}
	return "";
}

module.exports.Engine = Engine;
