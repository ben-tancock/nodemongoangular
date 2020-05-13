/*
UNDERSTANDING THE ADMIN OBJECT:
- the Admin object is used to perform certain administrative functions on a mongodb database
- the admin object represents a connection specifically to the admin database and provides functionality not included in the Db object
- can be created using the admin() method on an instance of the Db object or by passing a Db object in the constructor
    var adminDb = db.admin()
    var adminDb = new Admin(db)
- has methods like serverStats(callback), ping(callback), listDatabases(..), etc.


UNDERSTANDING THE COLLECTION OBJECT:
- the collection object represents a collection in the mongodb database
- you use the collection object to access items in the collection, add, and query documents, and much more
- a collection object can be created using the collection() method on an instance of the Db object

var collection = db.collection()
var collection = new collection(db)
db.createColection("newCollection", function(err, collection){...})

UNDERSTANDING THE CURSOR OBJECT:
- when you perform certain operations on the mongodb using the mongodb node.js driver, the results come back as a cursor object
- the cursor object acts as a pointer that can be iterated on to access a set of objects in the database
- e.g. when you use find(), the actual documents aren't returned in the callback, but a cursor object. you can then use the cursor object to read the results.

the cursor object has methods such as each(cb), toArray(cb), nextObject(cb), etc.
*/

// ACCESSING AND MANIPULATING DATABASES:

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;



MongoClient.connect("mongodb://localhost:8080/testDB", function(err, client){
    // The admin object creation from the book doesn't work now either :))))
    //var adminDb = client.admin();   - doesn't work lol
    var adminDb = client.db("testDB").admin(); // this creates the admin object (NOT a database)

    adminDb.serverStatus(function(err, status){ 
        console.log("1ST FUNCTION");
        if(err){
            console.log("error retrieving server status: " + err);
        }else{
            console.log(status);
        }
    });


    adminDb.listDatabases(function(err, databases){
        console.log("2ND FUNCTION");
        console.log("Before Add database list: ");
        console.log(databases);
    });

    // for some reason, admin() db can't create a collection?
    // admin objects perform certain administrative functions on a mongodb database, but not adding or removing collections, but users
    var newDB = client.db("newDB");
    newDB.createCollection("newCollection", function(err, collection){
        console.log("3RD FUNCTION");
        if(!err){
            console.log("new database and collection created");
            adminDb.listDatabases(function(err, databases){
                console.log("After Add database list");
                console.log(databases);

                /* database update operators:
                - when performing updates on objects in mongodb, you need to specify exactly what fields need to be changed and how
                - mongodb allows you to implement an update object with operators that define these things
                - the format of the update object is as follows:
                {
                    <operator>: {<field_operation>, <field_operation>, ...}
                    <operator>: {<field_operation>, <field_operation>, ...}
                    ...
                }

                for example:
                {
                    name: "myName",
                    countA: 0,
                    countB: 0,
                    days: ["Monday", "Wednesday"],
                    scores: [{id:"test1", score:94}, {id:"test2", score:85}, {id:"test3", score:97}]
                }

                if you want to increment the countA field by 5, countB by 1, set name to "New Name", add Friday to the days array, and sort scores array by the score field, you'd do this:
                {
                    $inc:{countA:5, countB:1},
                    $set:{name:"New Name"},
                    $push{days:"Friday"},
                    $sort{score:1} 
                }

                Adding documents to a collection:
                - to insert a document, you first create a javascript object that represents the document that you want to store.
                - once you have the object, you can store it in the mongodb database using the insert() method on an instance of the Collection object connected to the database:
                    insert(docs, [options], callback) 
                        - the docs param can be a single document object or an array of them, the options param specifies the database change options described previously, the first param of the callback function is an error, and the 2nd is an rray of the documents inserted.
                */

                collection.insertOne({propertyA:"propA", propertyB:"propB"},function(err, result){
                    console.log("4TH FUNCTION");
                    if(!err){
                        console.log("inserted: \n" + result + "\n");
                        //console.log(result);
                    }
                });

                collection.insertOne({propertyC:"propC", propertyB:"propB"},function(err, result){
                    console.log("5TH FUNCTION");
                    if(!err){
                        console.log("inserted: \n" + result + "\n");
                        //console.log(result);
                    }
                });

                
                /* GETTING DOCUMENTS FROM A COLLECTION:
                    collection.find(query, [options], callback)
                    collection.findOne(query, [options], callback)
                    - the query object contains properties that are matched against fields in the documents
                    - the find() method returns a cursor object that can be iterated on to retrieve documents, whereas findOne() returns a single object */

                collection.find({propertyB:"propB"}, function(err, items){
                    console.log("6TH FUNCTION");
                    items.each(function(err, item){
                        if(item){
                            var parsed = JSON.stringify(item);
                            console.log("Singular Document Found: \n" + parsed + "\n");
                        }
                    }); 
                });

                collection.findOne({propertyC:"propC"}, function(err, item){
                    console.log("7TH FUNCTION");
                    if(item){
                        var parsed = JSON.stringify(item);
                        console.log("Document Found: \n" + parsed + "\n");
                    }
                });

                /* UPDATING DOCUMENTS IN A COLLECTION:
                    update(query, update, [options], [callback])
                    - the query param is a document used to identify which document(s) you want to change (properties and values are matched just like in find() and findOne())
                        - when updating multiple documents with the update() call, you can isolate writes to protect the documents from other writes using the $isolate:1 property in the query
                    - the update param is an object that specifies the changes to be made
                        - the changes can be made with operators such as $inc (increment), $rename, $pop, $set, etc.
                    - the options param specifies the database change options
                        - a lot of the options properties are booleans that specifies whether certain things happened (e.g. mutli:true = will confirm that multiple documents have been updated)
                    - the callback param (function) is required if you are implementing a write concern in the options
                        - the first parm of the cb function is an error, and the 2nd is an array of the documents inserted into the collection
                */
                
                // $isolated has been removed, use transaction instead, see: https://docs.mongodb.com/manual/release-notes/4.0-compatibility/
                collection.updateMany({propertyB:"propB"}, {$set:{propertyB:"changed"}}, {multi:true, w:1}, function(err, results){
                    console.log("8TH FUNCTION");
                    if(err){
                        console.log("error with update: " + err);
                    }
                   collection.find({propertyB:"changed"}, function(err, items){
                       items.toArray(function(err, itemArr){
                           console.log("After update: ");
                           console.log(itemArr);
                       });
                   });


                   client.db("newDB").dropDatabase(function(err, results){
                       console.log("9TH FUNCTION");
                        if(!err){
                            console.log("database dropped");
                            setTimeout(function(){
                                console.log("setting timeout");
                                adminDb.listDatabases(function(err, results){
                                    var found = false;
                                    for(var i = 0; i < results.databases.length; i++){
                                        if(results.databases[i].name == "newDB"){
                                            found = true;
                                        }
                                    }
                                    if(!found){
                                        console.log("After Delete Database List:");
                                        console.log(results);
                                    }
                                    client.close();
                                    console.log("closing connection");
                                });
                            }, 5000);
                        }
                    });


                   
                });
                

                
            });
            
        } else{
            console.log("error with database and collection creation: " + err);
        }
    });
});