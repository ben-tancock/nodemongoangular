var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dictionary');
var wordSchema = require('./words_schema.js').wordSchema;
var Words = mongoose.model('Words', wordSchema);

Words.schema.path('word').validate(function(value){
    return value.length < 0;
}, "Word is too small");

Words.schema.path('word').validate(function(value){
    return value.length > 20;
}, "Word is too large");

mongoose.connection.once('open', function(){
    var newWord = new Words({
        word:'supercalifragilisticexpealidocious',
        first: 's',
        last: 's',
        size: 'supercalifragilisticexpealidocious'.length
    });

    newWord.save(function(err){
        console.log(err.errors.word.message);
        console.log(String(err.errors.word));
        console.log(err.errors.word.type);
        console.log(err.errors.word.path);
        console.log(err.errors.word.value);
        console.log(err.name);
        console.log(err.message);
        mongoose.disconnect();
    })
});