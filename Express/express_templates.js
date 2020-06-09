var express = require('express'),
    pug = require('pug'),
    ejs = require('ejs');

var app = express();
app.set('views', './Views');
app.set('view engine', 'pug');
app.engine('pug', pug.__express);
app.engine('html', ejs.renderFile);
app.listen(80);
app.locals.uname = 'Caleb';
app.locals.vehicle = 'TARDIS';
app.locals.terrain = 'time and space';
app.locals.climate = 'kind of cold I guess';
app.locals.location = 'anywhere anytime';
app.get('/pug', function(req, res){
    res.render('user_pug');
});
app.get('/ejs', function(req, res){
    app.render('user_ejs.html', function(err, renderedData){
        res.send(renderedData);
    });
});