var express = require('express');
var url = require('url');
var app = express();
app.listen(80);

app.get('/image', function(req, res){
    // res.sendFile(path, [options], [callback])
    res.sendFile('yoda.jpg', {maxAge: 1, root:'./Views/'},
        function(err){
            if(err){
                console.log("Error");
            }
            else{
                console.log("Success");
            }
    });
});

/*app.get('/imagedownload', function(req, res){
    res.download("yoda.jpg", 
    function(err){
        if(err){
            console.log("Error");
        }
        else{
            console.log("Success");
        }
    });
});*/