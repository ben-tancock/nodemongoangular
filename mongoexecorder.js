var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var Promise = require('promise');

function doThing(thing){
    console.log(thing);
}

function setDatabase(client){
    console.log("database set");
    return client.db("testcreate");
}

MongoClient.connect("mongodb://localhost:8080/", function(err, client){
    var myDB = setDatabase(client);
    var promise1 = new Promise(function(resolve, reject){
        resolve(myDB);
    })
    
    promise1.then(function(value){
        client.db("testcreate").stats(function(err, result){
            console.log("the stats: ");
            console.log(result);
        });
    })
    //var myDB = client.db("createtest");
    
});