var express = require('express');
var card = require('./card');
var deck = require('./deck');
var fs=require('fs')
var app = express();

app.configure(function() {

  app.use(express.cookieParser('keyboard cat'));
  app.use(express.session());

  app.set('views', __dirname+"/public/");
  app.set('view engine', 'ejs');
  
  app.use(express.logger('dev'));
  app.use(express.static(__dirname+"/public/")); 

  app.use(express.bodyParser());
  app.use(app.router);

});


// Define some demo data
var bookList = [];
bookList.push({title: "red", author: "Daniel Kahneman"});
bookList.push({title: "green", author: "Nate Silver"});

// Render a list of books
app.get('/books', function(req, res){
  res.render("book.ejs", {books: bookList});
});

app.post('/login', function(req, res){
  if(req.session.login)
  {
    console.log("already log : " + req.session.login);
  }
  else
  {
    req.session.login = req.body.login;
  }
  res.send("<p>Your search for <b>" + req.body.login + "</b> returned no results</p>");
});

app.get('/card/:color/:number', function(req, res){
  var fileName =  __dirname + "/public/card_n.svg";

//fs.exists(fileName, function(exists) {

  //if (exists) {

    fs.stat(fileName, function(error, stats) {

      fs.open(fileName, "r", function(error, fd) {

        var buffer = new Buffer(stats.size);

        fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {

          var data = buffer.toString("utf8", 0, buffer.length);
          data = data.replace(/@@@color@@@/g, req.params.color);
          data = data.replace(/@@@number@@@/g, req.params.number);
       fs.close(fd);
         res.writeHeader(200, {"Content-Type": "image/svg+xml"});
  //res.render("card.ejs", {card: {'color': 'blue'}});
  res.write(data);
  res.end();

        });

    //  });

    });

  }

});
});

// Render an individual book
app.get('/books/:id', function(req, res){
  var index = parseInt(req.params.id) - 1;
  var bookData = bookList[index]; 
  //var bookData = {title: "the name of the book", author: "some writer"};
  res.render("book.ejs", {book: bookData});
});

// Search form (GET)
app.get('/search', function(req, res){
  res.render("bookSearch.ejs");
});

// Search form (POST)
app.post('/search', function(req, res){
  var searchText = req.body.searchText;
  res.send("<p>Your search for <b>" + searchText + "</b> returned no results</p>");
});

app.listen(8888);
console.log('Listening on port 8888');
