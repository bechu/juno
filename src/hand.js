var card = require('./card');

var Hand = function() {
    this.cards = new Array():
}

Hand.prototype.Add = function(card) {
    this.cards.push(card);
}

Hand.prototype.Count = function() {
    return this.cards.length;
}

Hand.prototype.Get = function(index) {
    if(index < this.cards.length)
        return this.cards[i];
    return null;
}

Hand.protoype.Remove = function(index) {
    delete this.cards[index];
}

module.exports.Hand = Hand;

