var express = require('express');
var card = require('./card');
var deck = require('./deck');
var fs = require('fs');
var app = express();

var engine = require('./engine');


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
    app.game = new engine.Engine();
});

app.get('/disconnect', function(req, res) {
    app.game.RemovePlayer(req.session.gid);
    delete req.session.login;
    delete req.session.gid;
    res.redirect("/");
});

app.get('/login', function(req, res){
    req.session.login = req.query['user'];
    req.session.gid = app.game.AddPlayer(req.session.login);
    res.redirect("/");
});

app.get('/', function(req, res) {
    if(req.session.login)
        res.sendfile(__dirname+'/public/board.html');
    else
    {
    req.session.login = "Jérôme";
    req.session.gid = app.game.AddPlayer(req.session.login);
    res.redirect("/");
      //  res.sendfile(__dirname+'/public/login.html');
    }
});

app.get('/game/name', function(req, res) {
    res.send("<h1>" + req.session.login + "</h1>");
});

app.get('/game/deal', function(req, res) {
    app.game.Deal();
    res.send("done");
});
   
app.get('/game/update', function(req, res) {
    res.send(app.game.RenderPlayers());
});

app.get('/game/myhand', function(req, res) {
    res.send(app.game.RenderHand(req.session.gid));
});

app.get('/game/deck', function(req, res) {
    res.send(app.game.RenderDeck());
});

app.get('/all/', function(req, res) {
    var ret = "";
    var d = new deck.Deck();
    for(var i =0;i<108;i++) {
        var c = d.Deal(1);
        ret += c;
        ret += "<hr > <object data='"+c.GetUri()+"' type='image/svg+xml'></object>"; 
        ret += "<hr />";
    }
    res.send(ret);
});

app.get('/card/:color/:number', function(req, res) {
    var fileName =  __dirname + "/public/card_n.svg";

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

});

app.get('/reverse/:color', function(req, res){
    var fileName =  __dirname + "/public/card_inv.svg";

    fs.stat(fileName, function(error, stats) {

        fs.open(fileName, "r", function(error, fd) {

            var buffer = new Buffer(stats.size);

            fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {

                var data = buffer.toString("utf8", 0, buffer.length);
                data = data.replace(/@@@color@@@/g, req.params.color);
                fs.close(fd);
                res.writeHeader(200, {"Content-Type": "image/svg+xml"});
                //res.render("card.ejs", {card: {'color': 'blue'}});
                res.write(data);
                res.end();

            });

        });

    });

});

app.get('/plus2/:color', function(req, res){
    var fileName =  __dirname + "/public/card2.svg";

    fs.stat(fileName, function(error, stats) {

        fs.open(fileName, "r", function(error, fd) {

            var buffer = new Buffer(stats.size);

            fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {

                var data = buffer.toString("utf8", 0, buffer.length);
                data = data.replace(/@@@color@@@/g, req.params.color);
                fs.close(fd);
                res.writeHeader(200, {"Content-Type": "image/svg+xml"});
                //res.render("card.ejs", {card: {'color': 'blue'}});
                res.write(data);
                res.end();

            });

        });

    });

});

app.get('/plus4/', function(req, res){
    var fileName =  __dirname + "/public/card4.svg";

    fs.stat(fileName, function(error, stats) {

        fs.open(fileName, "r", function(error, fd) {

            var buffer = new Buffer(stats.size);

            fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {

                var data = buffer.toString("utf8", 0, buffer.length);
                fs.close(fd);
                res.writeHeader(200, {"Content-Type": "image/svg+xml"});
                res.write(data);
                res.end();

            });

        });

    });

});

app.get('/multi/', function(req, res){
    var fileName =  __dirname + "/public/cardmulti.svg";

    fs.stat(fileName, function(error, stats) {

        fs.open(fileName, "r", function(error, fd) {

            var buffer = new Buffer(stats.size);

            fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {

                var data = buffer.toString("utf8", 0, buffer.length);
                fs.close(fd);
                res.writeHeader(200, {"Content-Type": "image/svg+xml"});
                res.write(data);
                res.end();

            });

        });

    });

});

app.get('/skip/:color', function(req, res){
    var fileName =  __dirname + "/public/card_skip.svg";

    fs.stat(fileName, function(error, stats) {

        fs.open(fileName, "r", function(error, fd) {

            var buffer = new Buffer(stats.size);

            fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {

                var data = buffer.toString("utf8", 0, buffer.length);
                data = data.replace(/@@@color@@@/g, req.params.color);
                fs.close(fd);
                res.writeHeader(200, {"Content-Type": "image/svg+xml"});
                res.write(data);
                res.end();

            });

        });

    });

});


app.listen(8888);
console.log('Listening on port 8888');
