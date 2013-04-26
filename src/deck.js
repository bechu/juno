var card = require('./card');
var shuffle = require('shuffle');

var Deck = function() {
  this.d = shuffle.shuffle({deck: this.Create()});
  this.d.shuffle();
}

Deck.prototype.Deal = function(count) {
  return this.d.draw(count);
}

Deck.prototype.Size = function(count) {
  return this.d.length;
}

Deck.prototype.Reset = function(count) {
  return this.d.reset();
}

Deck.prototype.Create = function() {
  var colors = ['blue', 'red', 'yellow', 'green'];
  var ret = new Array();
  for(var i=0;i<10;i++) {
    for(var color in colors) {
      if(i > 0)
        ret.push(new card.Card(colors[color], i)); 
      ret.push(new card.Card(colors[color], i)); 
    }
  }
  for(var color in colors) {
    for(var j=0;j<2;j++) {
      ret.push(new card.Card(colors[color], '+2')); 
      ret.push(new card.Card(colors[color], 'skip')); 
      ret.push(new card.Card(colors[color], 'reverse')); 
    }
  }
  for(var j=0;j<4;j++) {
    ret.push(new card.Card('*', '+4')); 
    ret.push(new card.Card('*', 'joker')); 
  }
  return ret;
}

module.exports.Deck = Deck;

