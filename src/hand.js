
var Hand = function() {
    this.cards = new Array();
}

Hand.prototype.Add = function(card) {
    this.cards.push(card);
}

Hand.prototype.Size = function() {
    return this.cards.length;
}


Hand.prototype.Get = function(index) {
    if(index < this.cards.length)
        return this.cards[index];
    return null;
}

Hand.prototype.Remove = function(index) {
	this.cards.splice(index, 1);
}

Hand.prototype.Reset = function(index) {
    this.cards = new Array();
}

module.exports.Hand = Hand;
