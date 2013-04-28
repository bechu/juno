
exports.CardTest = function (test) {
	var card = require("./card");
	var c1 = new card.Card("blue", 2);
	var c2 = new card.Card("blue", 2);
    test.equals(c1.IsSameColor(c2), true);
    test.equals(c1.IsSameType(c2), true);
	var c2 = new card.Card("red", 2);
    test.equals(c1.IsSameColor(c2), false);
    test.equals(c1.IsSameType(c2), true);
	var c2 = new card.Card("blue", 8);
    test.equals(c1.IsSameColor(c2), true);
    test.equals(c1.IsSameType(c2), false);
    test.done();
}

exports.DeckTest = function (test) {
	var deck = require("./deck");
	var u = new deck.Deck();
	test.equals(u.Size(), 108);
	var a = u.Deal(1);
	var b = u.Deal(1);
    test.equals(a.IsSameColor(b) && a.IsSameType(b), false);
	var j = u.Deal(10);
	test.equals(u.Size(), 96);
	u.Reset();
	test.equals(u.Size(), 108);
	var j = u.Deal(5);
	for(var i in j) {
		console.log(j[i]);
	}
	test.done();
}

exports.HandTest = function (test) {
	var hand = require("./hand");	
	var card = require("./card");
	var c1 = new card.Card("blue", 2);
	var h = new hand.Hand();
	h.Add(c1);
	test.equals(h.Size(), 1);
	var c2 = h.Get(0);
    test.equals(c1.IsSameColor(c2), true);
    test.equals(c1.IsSameType(c2), true);
	h.Remove(0);
	test.equals(h.Size(), 0);
	h.Add(c1);
	h.Add(c1);
	test.equals(h.Size(), 2);
	h.Reset();
	test.equals(h.Size(), 0);	
	test.done();
}

exports.PlayerTest = function (test) {
	var player = require("./player");
	var p = new player.Player("test");
	test.equals(p.GetName(), "test");
	var h = p.GetHand();
	test.equals(h.Size(), 0);
	test.done();
}

exports.EngineTest = function (test) {
	var engine = require("./engine");
	var e = new engine.Engine();
	e.AddPlayer("Jérôme");
	e.AddPlayer("Hélène");
	e.AddPlayer("Mathieu");
	test.equals(e.CountPlayer(), 3);
	e.Deal();
	console.log(e.RenderPlayers());
	test.done();
}
