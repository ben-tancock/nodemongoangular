var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dictionary');

var Schema = mongoose.Schema;
var wordSchema = new Schema({
    word: {type: String, index: 1, required: true},
    first: {type: String, index: 1},
    last: String,
    size: Number,
    letters: [String]
    }, {collection: 'wordCollection'}
);

wordSchema.methods.startsWith = function(letter){
    return this.first === letter;
};
exports.wordSchema = wordSchema;

// this is an example of compiling the model for the Schema object
var Words = mongoose.model('Words', wordSchema);

//console.log(mongoose.model('Words').find({value:{$gt:5}}, {sort:[['value', -1]]}, {fields:{name:1, title:1, value:1}}, function(err, results){}));
console.log(mongoose.model('Words').find({first:{$eq:"a"}}));
//mongoose.model('Words').find({first:{$eq:"a"}});

var query = Words.count().where('first').in(['a', 'e', 'i', 'o', 'u']);
/*
query.exec(function(err, count){
    console.log("\n There are " + count + " words that start with a vowel");
});*/


var query3 = Words.find().where('first').in(['a']);
query3.exec(function(err, docs){
    console.log("\nWords that start with 'a': ");
    for(var i in docs){
        console.log(docs[i].word);
    }
});
/*
console.log(query2);

query.exec(function(err, docs){
    console.log("longest 5 words hurhrur");
    for(var i in docs){
        console.log(docs[i].word);
    }
});
console.log(query);*/


/*
   However, using Mongoose, all the query options can also be defined separately using the following code:
   this allows you to dynamically reuse the same Query object to perform multiple database operations.

var query = Words.find({});
query.where('value').lt(5); // where value less than 5
query.sort('-value');
query.select('name title value');
query.exec(function(err, results){});
*/

query.find().limit(5).sort({size:-1});
query.exec(function(err, docs){
    console.log("\nLongest 5 words that start with a vowel: ");
    for (var i in docs){
        console.log(docs[i].word);
    }
});

var query2 = Words.find();
query2.mod('size', 2, 0);
query2.where('size').gt(6);
query2.limit(10);
query2.select({word:1, size:1});
query2.exec(function(err, docs){
    console.log("\nWords with even lengths and longer than 5 letters: ");
    for(var i in docs){
        //console.log(JSON.stringify(docs[i]));
        console.log(docs[i].word);
    }
});