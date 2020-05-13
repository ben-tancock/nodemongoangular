var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

/* SOMETHING TO NOTE:
 We're starting to write code that looks like callback hell. To avoid this, from now on we should:
 - keep our code shallow
 - give asynchronous functions names, and then move functions to top level of our program
 - modularize
 - handle every single error
 - don't nest functions
 - use function hoisting
 - create reusable functions and place them in a module, split code into small pieces
 - also should look into async and promises
 for more, see: http://callbackhell.com/
*/

function setDB(dbName, client, collName){
    return new Promise(function(resolve, reject){
        var tempDB = client.db(dbName);
        if(tempDB){
            console.log("set db to " + dbName);
            resolve(tempDB); // we can catch the message sent by resolve in the then(function(<messagegoeshere>))
        }
    }); 
   
}

function createColl(theDB, collName){
    return new Promise(function(resolve, reject){
        theDB.createCollection(collName, function(err, result){
            console.log("created collection " + collName);
            resolve(theDB.collection(collName)); 
        });
        
    }); 

}

function insertColl(collection, collObj){
    return new Promise(function(resolve, reject){
        collection.insertOne(collObj, function(err, result){
            console.log("inserted into collection");
            resolve("inserted into collection");
        });
    }); 

}






MongoClient.connect("mongodb://localhost/8080", function(err, client){
  
// as we can see, promises can really clean up callback hell a bit
// sure we need to make some more functions, but it's a lot more readable and makes more sense
    setDB("astro", client, "nebulae").then(function(result){
        return createColl(result, "nebulae");
    }).then(function(result){
        return insertColl(result, {type:"supernova"});
    }).then(function(){
        client.db("astro").collection("nebulae", function(err, nebulae){
            console.log("coll");
            nebulae.findOne({type:"supernova"}, function(err, item){
                console.log("Before save: ");
                console.log(item);
                item.info = "some new info";
                nebulae.save(item, {w:1}, function(err, results){
                    nebulae.findOne({_id:item._id}, function(err, savedItem){
                        console.log("After Save: ");
                        console.log(savedItem);
                        client.db("astro").dropDatabase(function(err, result){
                            console.log("database dropped");
                            client.close(function(err, result){
                                console.log("client closed");
                            });
                        });
                    });
                });
            });
        });
    });
});