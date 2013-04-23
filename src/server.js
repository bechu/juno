var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");

function start(route) {
  function onRequest(request, response) {
    var uri = url.parse(request.url).pathname;

    var contentTypesByExtension = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'text/javascript'
    };

    //console.log(request.url);

    console.log(uri);
    //path.extname(filename)
    //var contentType = contentTypesByExtension[fileExtension] || 'text/plain';
//    route(pathname);
/*
    fs.readFile(__dirname + '/media/index.html', 'utf8', function(err, data) {
      if(err) {
        response.writeHead(404);
        response.end(JSON.stringify(err));
        return ;
      }
      response.writeHead(200);
      response.end(data);
    });*/
    
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
    
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
