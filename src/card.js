
var Card = function(type, subtype) {
  this.type = type;
  this.subtype = subtype;
  this.choice = "red";
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

Card.prototype.IsCompatible = function(rhs) {
  if(rhs.type == "*")
  {
    if(rhs.subtype == "+4") return true;
    if(rhs.subtype == "joker") return true;
  }  

  if(this.type == "*")
  {
    if(this.subtype == "+4") return true;
    if(this.subtype == "joker") return true;
  }

  if(this.type == rhs.type)
    return true;
  if(this.subtype == rhs.subtype)
    return true;
  return false;
}

Card.prototype.Render = function(i) {
  if(this.type == "*")
  {
    var ret = '<span class="btn btn-info"><object height="240" data="'+this.GetUri()+'" type="image/svg+xml"></object></button><br />';
    ret += '<button class="badge badge-success" type="button" onClick="playSpec('+i+', "green");">Vert</button>';
    ret += '<button class="badge badge-warning">Jaune</button>';
    ret += '<button class="badge badge-important">Rouge</button><button class="badge badge-info">Bleu</button></span>';
    return ret;
  }
  return '<button class="btn btn-info" type="button" onClick="play('+i+');"><object data="'+this.GetUri()+'" type="image/svg+xml"></object></button>';
}

module.exports.Card = Card;
