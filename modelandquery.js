var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dictionary');

/*mongoose.connection.on('open', function(){
  
});*/


var Schema = mongoose.Schema;
var wordSchema = new Schema({
    word: {type: String, index: 1, required: true},
    first: {type: String, index: 1},
    last: String,
    size: Number,
    letters: [String],
    stats: {vowels: Number, consonants: Number},
    charsets: [Schema.Types.Mixed]
    }, {collection: 'word_stats'}
);

wordSchema.methods.startsWith = function(letter){
    return this.first === letter;
};
exports.wordSchema = wordSchema;

// this is an example of compiling the model for the Schema object
var Words = mongoose.model('Words', wordSchema);
// you can then access the compiled Model object any time using the following:
// mongoose.model('Words')...

// this is the model find request, which uses the same syntax as the native driver
mongoose.model('Words').find({value:{$gt:5}}, {sort:[['value', -1]]}, {fields:{name:1, title:1, value:1}}, function(err, results){});

// However, using Mongoose, all the query options can also be defined separately using the following code:
// this allows you to dynamically reuse the same Query object to perform multiple database operations.
var query = Words.find({});
query.where('value').lt(5); // where value less than 5
query.sort('-value');
query.select('name title value');
query.exec(function(err, results){});

// Finding documents in Mongoose: all three of the following queries are identical, just built in different ways
//var query1 = mongoose.model('example').find({name:'test'}, {limit:10, skip:5, fields:{name:1, value:1}});
//var query2 = mongoose.model('example').find().where('name', 'test').limit(10).skip(5).select({name:1, value:1});

// this part I'm not so sure about...
//var query3 = mongoose.model('example').find().query3.where('name', 'test').query3.limit(10).skip(5);
//query3.select({name:1, value:1});

console.log("Required paths: ");
console.log(wordSchema.requiredPaths());
console.log("Indexes: ");
console.log(wordSchema.indexes());