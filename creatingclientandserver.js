
// CREATING AN HTTPS CLIENT
/* 
- https is just http running on top of the SSL/TLS protocol
- before getting started using https, you need to generate a private key and a certificate
- there are many ways to do this, but one of the simplest ways is to use the OpenSSL library for your platform

to generate the private key, first execute the following openSSL command:
    openssl genrsa -out server.pem 2048

next, use the following command to create a certificate signing request file:
    openssl req -new -key server.pem -out server.csr

then to create a self-signed certificate that you can use for your own purpose or for testing, use the following command:
    openssl x509 -req -days 365 -in server.csr -signkey server.pem -out server.crt

- creating an https client is almost exactly the same as creating an http client,
    the only difference is that there are additional options: the most important of which are key, cert, and agent.

    key: specifies the private key used for SSL
    cert: specifies the x509 public key to use
    agent: the global agent does not support options needed by https, so you need to disable the agent by setting the agent to null


var fs = require('fs');
var options = {
    key: fs.readFileSync('test/keys/client.pem'),
    cert: fs.readFileSync('test/keys/client,crt'),
    agent: false
};

you can also create your own custom Agent object that specifies the agent options used for the request:

options.agent = new https.Agent(options);
*/

// CREATING AN HTTPS SERVER
var https = require('https');
var fs = require('fs');


// in order to make this work, we need to install openssl, and to install openssl we need to install perl and I just... don't feel like doing this right now...
var options = {
    key: fs.readFileSync('test/keys/client.pem'),
    cert: fs.readFileSync('test/keys/client,crt')
};

https.createServer(options, function(req, res){
    res.writeHead(200);
    res.end("Hello secure world!");
}).listen(8080);