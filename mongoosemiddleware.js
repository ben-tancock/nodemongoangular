var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dictionary');
//var wordSchema = require('./words_schema.js').wordSchema;
//var Words = mongoose.model('Words', wordSchema, 'wordCollection');
//var Words = module.exports = mongoose.model('Words', wordSchema, 'wordCollection');

const schema = new mongoose.Schema({ name: String });
// Mongoose will call this middleware function, because this script adds
// the middleware to the schema before compiling the model.
schema.pre('init', function(next) {
    console.log("a new word is about to be initialized from the db");
    next();
});
schema.pre('validate', function(next) {
    console.log("%s is about to be validated", this.name);
    next();
});
schema.pre('save', function(next) {
    console.log("%s is about to be saved", this.name);
    next();
});
schema.pre('remove', function(next) {
    console.log("%s is about to be removed", this.name);
    next();
});

schema.post('init', function(doc) {
    console.log("%s has been initialized from the db", doc.name);
});
schema.post('validate', function(doc) {
    console.log("%s has been validated", doc.name);
});
schema.post('save', function(doc) {
    console.log("%s has been saved", doc.name);
});
schema.post('remove', function(doc) {
    console.log("%s has been removed", doc.name);
});

// Compile a model from the schema
const User = mongoose.model('User', schema);

//new User({ name: 'test' }).save();


mongoose.connection.once('open', function(){
    var addThis = new User({
        name: 'dingus'
    });
    console.log("\nSaving: ");
    addThis.save(function(err){
        if(err){
            console.log("\nerror saving word");
        }        
        //console.log("\nThe Doc:\n " + doc);
        console.log("\nRemoving: ");
        addThis.remove(function(err){
            mongoose.disconnect();
        });
        
    });
});





// to apply the middleware synchronously, you simply call next() in the middleware function
/*
Words.schema.pre('init', function(next){
    console.log("a new word is about to be initialized from the db");
    next();
});

Words.schema.pre('validate', function(next){
    console.log('%s is about to be validated', this.word);
    next();
});

Words.schema.pre('save', function(next){
    console.log('%s is about to be saved', this.word);
    console.log('Setting size to %d', this.word.length);
    this.size = this.word.length;
    next();
});

Words.schema.pre('remove', function(next){
    console.log("%s is about to be removed", this.word);
    next();
});

Words.schema.post('init', function(doc){
    console.log("%s has been initialized from the db", doc.word);
});

Words.schema.post('validate', function(doc){
    console.log("%s has been validated", doc.word);
});

Words.schema.post('save', function(doc){
    console.log("%s has been saved", doc.word);
});

Words.schema.post('remove', function(doc){
    console.log("%s has been removed", doc.word);
});

mongoose.connection.once('open', function(){
    var newWord = new Words({
        word:'newword',
        first:'t',
        last:'d',
        size:'newword'.length
    });
    console.log("\nSaving: ");
    newWord.save(function(err){
        if(err){
            console.log("\nerror saving word");
        }
        console.log("\nFinding: ");
        Words.findOne({word:'newword'}, function(err, doc){
            //console.log("\nThe Doc:\n " + doc);
            console.log("\nRemoving: ");
            newWord.remove(function(err){
                mongoose.disconnect();
            });
        });
    });
});

*/