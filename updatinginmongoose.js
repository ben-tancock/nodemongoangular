/*  the nice thing about updating at the Model level (e.g. using the Model.update as opposed to just finding the object(s) in a query and setting the properties)
    is that you can use the Query object to define which object(s) should be updated. Multiple Query options can be piped into the query object before executing it
*/
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dictionary');
var wordSchema = require('./words_schema.js').wordSchema;

// when you want to export models (and you already have a collection defined) you need to add the collection name in the model object definition
var Words = mongoose.model('Words', wordSchema, 'wordCollection');

mongoose.connection.once('open', function(){
    Words.find({word:/grati*/}, function(err, docs){
        console.log("Before Update: ");
        for (var i in docs){
            console.log(docs[i].word + " : " + docs[i].size);
        }
        var query = Words.update({}, {$set: {size:0}});
        query.setOptions({multi:true});
        query.where('word').regex(/grati.*/);
        query.exec(function(err, results){
            Words.find({word:/grati.*/}, function(err, docs){
                console.log("\nAfter Update: ");
                for(var i in docs){
                    console.log(docs[i].word + " : " + docs[i].size);
                }
            });
        });
    });
});


/*var query3 = Words.find().where('first').in(['a']);
query3.exec(function(err, docs){
    console.log("\nWords that start with 'a': ");
    for(var i in docs){
        console.log(docs[i].word);
    }
});*/