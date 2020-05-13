var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/words');
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

console.log("Required paths: ");
console.log(wordSchema.requiredPaths());
console.log("Indexes: ");
console.log(wordSchema.indexes());