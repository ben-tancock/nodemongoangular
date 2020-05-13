//var MongoClient = require('mongodb').MongoClient, Server = require('mongodb').Server;
//var client = new MongoClient();

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
 


/* after you have connected to the mongo client, you still need to open a connection to the MongoDB server database using the connect(url, options, callback) method
   the url is composed of several components (see txtbk table 13.2 chapter 13)
   the following syntax is used for these options:
   mongodb://[username:password@]host[:port][/[database][?options]]

   for example, if you wanted to connect to a mongodb database named MyDB on a host named MyDBServer on port 8080, you'd use the following url:
   client.connect('mongodb://MyDBServer:8088/MyDB')

   You need to actually make the mongodb servers in the terminal, obvi.

   Since the textbook was written, mongodb has changed a bit. see : https://stackoverflow.com/questions/56625122/typeerror-connect-only-accepts-a-callback
*/

// in order for this to work, you must run mongo in the terminal
// 1: create a data files directory, with a data folder, that contains a db folder
// 2: run the following command:
// D:\>mongod -port 8080 --dbpath D:\MongoData\data\db
MongoClient.connect('mongodb://localhost/testDB', {poolSize: 5, reconnectInterval: 500}, function(err, client){
    console.log("test connect");
    if(err){
        console.log("connection failed via client object: " + err);
    } else{
        var db = client.db("testDB");
    }
    if(client){
        console.log("Connected via client object");
        
        // debugger says db.authenticate and db.auth aren't functions...
        // I can't find the db.authenticate() function in the node.js mongodb documentation anywhere, pretty sure its deprecated. let's drop it for now...
        // see: https://github.com/Automattic/mongoose/issues/5304 and https://mongodb.github.io/node-mongodb-native/2.0/reference/connecting/authenticating/
      /* client.authenticate("dbadmin", "test", function(err, results){
            if(err){
                console.log("Error authenticating: " + err);
                client.close();
                console.log("Connection closed");
            } else{
                console.log("Authenticated via client object");
                client.logout(function(err, result){
                    if(!err){
                        console.log("Logged out via client object");
                    }
                    client.close();
                    console.log("Connection closed");
                });
            }
        }); */

        /* it also appears that logout isn't a function either...
         I suppose that maybe makes sense since we haven't authenticated, so we can't log out...?
         ACTUALLY I WAS WRONG: READ THIS, IT'S IMPORTANT:
         YOU NEED TO USE 'client' INSTEAD OF 'db' IN THE MongClient.connect(...) CALLBACK FUNCTION OTHERWISE THINGS WON'T WORK!! 
         client.authenticate and client.auth still don't work though...
         */

        /*db.logout(function(err, result){
            if(!err){
                console.log("Logged out via client object");
            }
            db.close();
            console.log("Connection closed");
        });*/
        client.logout(function(err, result){
            if(!err){
                console.log("logged out via client object");
            }
            client.close();
            console.log("Connection closed");

        });
        
    }
});
