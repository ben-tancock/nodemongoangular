// to use this: just type 'localhost/<thing>' in the URL, where thing corresponds to any of the app.get parameters

var express = require('express');
var url = require('url');
var app = express();
app.listen(80);

app.get('/', function(req, res){
    res.send("Get Index");
});

app.get('/find', function(req, res){
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var response = 'Finding book: Author ' + query.author + ' Title: ' + query.title;
    console.log('\nQuery URL: ' + req.originalUrl);
    console.log(response);
    res.send(response);
});

app.get(/^\/book\/(\w+)\:(\w+)?$/, function(req, res){
    var response = 'Get Book: Chapter: ' + req.params[0] + ' Page: ' + req.params[1];
    console.log('\nRegex URL: ' + req.originalUrl);
    console.log(response);
    res.send(response);
});

app.get('/user/:userid', function(req, res){
    var response = 'Get User: ' + req.param('userID');
    console.log('\nParam URL: ' + req.originalUrl);
    console.log(response);
    res.send(response);
});

/*  The following code is specifying a callback function
    that is exectuted if the defined parameter (userid) is found in a URL.
    When parsing the URL, if Express finds a parameter that has a callback registered,
    it calls the parameters callback function before calling the route handler. */
app.param('userid', function(req, res, next, value){
    console.log("\nRequest received with user id: " + value);
    next();
});

