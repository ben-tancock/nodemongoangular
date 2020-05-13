/*
Performing a count is much less intensive on the mongodb side because when retrieving documents using 
the find() and other methods, temporary objects such as cursors must be created and maintained by the server.

When performing operations on the resulting set of documents from a find(), you should be aware of how many documents you are going to be dealing with, especially in larger environments.
Sometimes all you want is a count. For example, if you need to know how many users are configured in your application, you could just count the number of documents in the users collection.

The count() method on the Collection object allows you to get a simple count of documents that match the query object criteria.
The count() method is formatted the exact way as the find() method.

count([query], [options], callback)
*/

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

MongoClient.connect("mongodb://localhost/8080/dictionary", function(err, client){
    var myDB = client.db("dictionary");
   // myDB.collection("wordCollection", countItems);
    myDB.collection("wordCollection", aggregateItems);
});

function countItems(err, words){
    words.count({first:{$in: ['a', 'b', 'c']}}, function(err, count){
        console.log("Words starting with a, b or c: " + count);
    });
    // the rest of this is almost exactly like doc_query, just with count() instead and printing out the number. you get the idea...
}

// for more on returning sets:
// you can also: limit result sets, page them, and sort them. all of these sections are almost identical aside from replacing the names of some methods, so we'll just skip them
// also, distinct() method on a collection gets a list of the distinct values for a single field in a set of documents

// Aggregate:
/*
    Aggregation operations can be performed on data with the aggregate() method

    aggregate(operators, [options], callback)

    operators: allows you to define what aggregation operation to perform on the data
    options: allows you to set the readPreference property
    callback: function that accepts an error, and results as two parameters (the results array is the fully aggregated object set returned by the aggregation)
*/

function aggregateItems(err, words){
    words.aggregate([{$match: {first:{$in: ['a', 'e' , 'i', 'o', 'u']}}},
        {$group: {_id:"$first",
            largest:{$max:"$size"},
            smallest:{$min:"$size"},
            total:{$sum:1}}},
        {$sort: {_id:1}}],
       function(err, results){
           console.log("Largest and smallest word sizes for words beginning with a vowel: ");
           results.each(function(err, docs){
               console.log(docs);
           })
       });
}