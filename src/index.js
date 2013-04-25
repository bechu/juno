var express = require('express');
var card = require('./card');
var deck = require('./deck');
var fs = require('fs')
var app = express();

app.configure(function() {

    app.use(express.cookieParser());
    var store = new express.session.MemoryStore;
    app.use(express.session({ secret: 'whatever', store: store }));

    //    app.set('views', __dirname+"/public/");
    //    app.set('view engine', 'ejs');
    app.use(express.logger('dev'));
    app.use(express.static(__dirname+"/public/")); 

    //    app.use(express.bodyParser());
    app.use(app.router);

});

app.get('/disconnect', function(req, res) {
    delete req.session.login;
    res.redirect("/");
});

app.get('/login', function(req, res){
    req.session.login = req.query['user'];
    res.redirect("/");
});

app.get('/', function(req, res) {
    if(req.session.login)
{
    res.sendfile(__dirname+'/public/board.html');
    //delete req.session.login;
}
else
res.sendfile(__dirname+'/public/login.html');
});

app.get('/game/name', function(req, res) {
    res.send("<h1>" + req.session.login + "</h1>");
});

app.get('/game/update', function(req, res) {
    res.send("<p>Test de jerome</p>");
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

        });

    });

    // }

    //});
});

app.listen(8888);
console.log('Listening on port 8888');

