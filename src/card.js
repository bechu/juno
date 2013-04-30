
var Card = function(type, subtype) {
  this.type = type;
  this.subtype = subtype;
  this.choice = "black";
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

Card.prototype.GetColor = function() {
  if(this.type == "*")
  {
    if(this.subtype == "+4") return this.choice;
    if(this.subtype == "joker") return this.choice;
  }
  return this.type;
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

Card.prototype.IsCompatible = function(rhs) {
  if(rhs.type == "*")
  {
    if(rhs.subtype == "+4") return true;
    if(rhs.subtype == "joker") return true;
  }  

  if(this.type == "*") {

    if(this.choice == rhs.type || this.choice == "black") {
      if(this.subtype == "+4") return true;
      if(this.subtype == "joker") return true;
    }
  }

  if(this.type == rhs.type)
    return true;
  if(this.subtype == rhs.subtype)
    return true;
  return false;
}

Card.prototype.Render = function(i) {
  if(this.type == "*")
    return '<a href="#" onClick="playChooseColor(\''+i+'\');"><img src="'+this.GetUri()+'"  width="100" /></a>';

  return '<a href="#" onClick="play('+i+');"><img src="'+this.GetUri()+'"  width="100" /></a>';
}

module.exports.Card = Card;
