var express = require('express');
var url = require('url');
var app = express();
app.listen(80);

app.get('/google', function(req, res){
    res.redirect('http://www.google.ca');
});

app.get('/first', function(req, res){
    res.redirect('/second');
});

app.get('/second', function(req, res){
    res.send('Response from second');
});

app.get('/level/A', function(req, res){
    res.redirect('../B');
});

app.get('/level/B', function(req, res){
    res.send('Response from level B');
});