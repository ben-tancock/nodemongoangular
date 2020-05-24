var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var fs = require('fs');
var randomWords = require('random-words'); // random words is a node package that generates random words as sample text.

/* the objective of this code is to create a lot of 'word' objects (see below) and insert them into a database
    document structure:
    {
        word: <word>
        first: <first_letter>
        last: <last_letter>
        size: <character_count>
        letters: [<array_of_characters_in_word_no_repeats]
    }
    */
MongoClient.connect("mongodb://localhost/dictionary", function(err, client){
    var myDB = client.db("dictionary");
    //console.log(randomWords());

    myDB.createCollection("wordCollection", function(err, collection){
        for(var i = 0; i < 1000; i++){
            var theWord = randomWords();
            var wordArr = Array.from(theWord);
    
            wordArr = wordArr.filter(function(e, i, arr){ // e = element, i = index, arr = array
                // indexOf returns the position of the first occurence of a specified value in the string
                return arr.indexOf(e) === i; // triple equals returns true if both operands are of the same type and contain the same value
            });
    
            var insertThis = {
                "word":theWord,
                "first":theWord[0],
                "last":theWord[theWord.length-1],
                "size":theWord.length,
                "letters":wordArr
            }
            collection.insertOne(insertThis, function(err, result){
                console.log("\nobject inserted: \n" + result + "\n");
            });
        }
    });

    




});