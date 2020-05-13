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
 for more, see: http://callbackhell.com/
*/
MongoClient.connect("mongodb://localhost/", function(err, client){
    var myDB = client.db("astro"); // this creates the database
    myDB.createCollection("nebulae", function(err, collection){
        if(!err){
            console.log("collection created: " + collection);
            collection.insertOne({type:"supernova"}, function(err, result){
                if(!err){
                    console.log("inserted supernova object into collection");

                    myDB.collection("nebulae", function(err, nebulae){
                        if(err){
                            console.log("error with collection() method");
                        }
                        nebulae.findOne({type:"supernova"}, function(err, item){
                            if(err){
                                console.log("error finding supernova object");
                            }
                           
                            if(item){
                                var parsed = JSON.stringify(item);
                                console.log("Singular Document Found: \n" + parsed + "\n");


                                /*  findAndModify is different from update() in that we are doing it 'atomically'
                                    if you fetch an item first and then update it, or vice versa, another thread might modify that same object inbetween those two steps
                                    doing it atomically means you are guarunteed to get the same exact item you are updating, ie, no other operation can happen inbetween.
                                    However, findAndModify() has deprecated... see: https://github.com/Automattic/mongoose/issues/6880
                                    the nerds recommend I use findOneAndUpdate(). According to this https://docs.mongodb.com/manual/core/write-operations-atomicity/,
                                    SINGLE WRITE TRANSACTIONS ARE ATOMIC
                                    
                                    .findOneAndUpdate(query, update, options)
                                    query = {type:"supernova"}
                                    update =
                                    options =
                                
                                // the default of findOneAndUpdate is to return the ORIGINAL, UNALTERED document
                                // if you want the NEW, UPDATED document, you have to pass an additional arguemnt: an object with the NEW property set to TRUE */
                                nebulae.findOneAndUpdate({type:"supernova"}, {$set:{type:"Super Nova", "updated":true}}, {returnOriginal:false}, function(err, doc){
                                    if(err){
                                        console.log("error finding and updating doc");
                                    }
                                    console.log("\nAfter Modify: \n");
                                    var parsed = JSON.stringify(doc);
                                    console.log(parsed + "\n");
                                    client.close();
                                });
                            }
                        });
                    });

                }else{
                    console.log("error inserting object into collection");
                }
            });
        } else{
            console.log("error creating collection");
        }
    });
});