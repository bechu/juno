
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

Card.prototype.IsSameColor = function(rhs) {
    if (this.type == rhs.type)
        return true;
    return false;
}

Card.prototype.IsSameType = function(rhs) {
    if (this.subtype == rhs.subtype)
        return true;
    return false;
}

module.exports.Card = Card;

