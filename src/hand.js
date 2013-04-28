
var Hand = function() {
    this.cards = new Array();
    this.changed = false; 
    this.changed = true;
}

Hand.prototype.Changed = function() {
  if(this.changed == true) {
        this.changed = false;
        return true;
  };
  return false;
}

Hand.prototype.Add = function(card) {
    this.cards.push(card);
    this.changed = true;
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
  this.changed = true;
}

Hand.prototype.Reset = function(index) {
    this.cards = new Array();
    this.changed = true;
}

module.exports.Hand = Hand;
