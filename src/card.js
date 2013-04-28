
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

Card.prototype.GetUri = function() {
  if(this.type == "*")
  {
    if(this.subtype == "+4") return "/plus4/";
    if(this.subtype == "joker") return "/multi/";
  }
  if(this.subtype == '+2') return "/plus2/"+this.type+"/";
  if(this.subtype == 'skip') return "/skip/"+this.type+"/";
  if(this.subtype == 'reverse') return "/reverse/"+this.type+"/";
  return "/card/"+this.type+"/"+this.subtype+"/";
}

module.exports.Card = Card;
