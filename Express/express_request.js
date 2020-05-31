/*  The route handlers are passed a Request object as the first parameter. 
    The Request object provides the data and metadata about the request, including the URL, headers, query string, and more.
    This allows you to handle the request appropriately in your code. */

// to use this: run and go to localhost/user/userid
var express = require('express');
var app = express();
app.listen(80);
app.get('/user/:userid', function(req, res){
    console.log("URL: " + req.originalUrl);
    console.log("Protocol: " + req.protocol);
    console.log("IP: \t" + req.ip);
    console.log("Path: \t" + req.path);
    console.log("Host: \t" + req.host);
    console.log("Method: \t" + req.method);
    console.log("Query: \t" + JSON.stringify(req.query));
    console.log("Fresh: \t" + req.fresh);
    console.log("Stale: \t" + req.stale);
    console.log("Secure: \t" + req.secure);
    console.log("UTFS: \t" + req.acceptsCharsets('utf8'));
    console.log("Connection: \t" + req.get('connection'));
    console.log("Headers: \t" + JSON.stringify(req.headers, null, 2));
    res.send("User Request");
});

/* The Response object passed to the route handler provides the necessary functionality to build and send proper HTTP response.
    You can use the Response object to set headers, the status, and send data back to the client.
    
    Setting the header is important to formulating a proper HTTP response (e.g. setting the Content-Type header determines how the browser handles the response.)
    The Response object provides several helper methods to get and set the ehader values that are sent with the HTTP response.
    The most commonly used are get(header) and set(header)

    You also need to set the HTTP status for the response if it is something other than 200.
    It is important to set the correct status response so that the browser or other applications can handle the HTTP response correctly.

    To set the status response, use the status(number) method where the parameter is the HTTP response status defined in the HTTP spec. */

app.get('/', function(req, res){
    var response = "<html><head><title>Simple Send</title></head>" + "<body><h1>Hewwo Fwom Expwess UwU</h1></body></html>";
    res.status(200);
    res.set({
        'Content-Type': 'text/html',
        'Content-Length': response.length
    });
    res.send(response);
    console.log('Response finished?' + res.finished);
    console.log('\nHeaders Sent: ');
    console.log(res.headersSent);
});

app.get('/error', function(req, res){
    res.status(400);
    res.send("This is a bad request");
});

