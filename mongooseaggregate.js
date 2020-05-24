var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dictionary');
var wordSchema = require('./words_schema.js').wordSchema;
var Words = mongoose.model('Words', wordSchema, 'wordCollection');
mongoose.connection.once('open', function(){
    Words.aggregate([{$match: {first: {$in:['a', 'e', 'i', 'o', 'u']}}},
        {$group: {_id:"$first", 
            largest:{$max:"$size"},
            smallest:{$min:"$size"},
            total:{$sum:1}}},
            {$sort: {_id:1}}],
        function(err, results){
            console.log("\nLargest and smallest word sizes for " + "words beginning with a vowel");
            for(var i in results){
                console.log(results[i]);
            }
        }
    );
});