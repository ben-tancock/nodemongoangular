/*Documents can be added (existing documents can be updated using save as well) to mongoose either by using the 'save' method on a newly created Document object (newWord1)
    or by using the 'create' method on the Model object (newWord2 and newWord3)*/

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dictionary');
var wordSchema = require('./words_schema.js').wordSchema;
var Words = mongoose.model('Words', wordSchema);
mongoose.connection.once('open', function(){

    var newWord1 = new Words({
        word: 'gratification',
        first: 'g', last:'n', size:12,
        letters: ['g', 'r', 'a', 't', 'i', 'f', 'c', 'o', 'n'],
        stats: {vowels: 5, consonants: 7}
    });
    console.log("Is Document New? " + newWord1.isNew);
    newWord1.save(function(err, doc){
        console.log("\nSaved Document: " + doc);
    });
    var newWord2 = { word: 'googled',
        first:'g', last:'d', size:7,
        letters:['g','o','l','e','d'],
        stats:{vowels:3, consonants:4}
    };
    var newWord3 = { word: 'selfie',
        first:'s', last:'e', size:6,
        letters:['s','e','l','f','i'],
        stats:{vowels:3, consonants:3}
    };

    Words.create([newWord2, newWord3], function(err){
        for(var i = 1; i < arguments.length; i++){
            console.log("\n Created document: " + arguments[i]);
        }
        mongoose.disconnect();
    });
});