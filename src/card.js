
var Card = function(type, subtype) {
  this.type = type;
  this.subtype = subtype;
}

Card.prototype.toString  = function() {
  return this.type + " " + this.subtype;
}

Card.prototype.GetType = function() {
  return this.type
}

module.exports.Card = Card;
