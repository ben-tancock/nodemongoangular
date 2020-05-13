/* The data set, and query objects:

- to find all the documents with a count value greater than 10 and name value equal to test, the query object would be:
    {count:{$gt:10}, name:'test'}
    - the gt operator specifies the documents with a count field larger than 10.
    - the standard colon syntax of name:'test' is also an operator that specifies that the name field must equal 'test' 

When specifying field names in a query object, you can use dot notation to specify subdocument fields. For example, consider the following object format:

{
    name:'test',
    stats: {height:74, eyes:'blue'}
}

you can query users that have blue eyes by doing the following:

{
    stats.eyes:'blue'
}

OTHER EXAMPLES:

find words starting with a, b, or c:
{first: {$in: ['a', 'b', 'c']}}

find words longer than 12 letters:
{size: {$gt: 12}}

find words with an even # of letters:
{size: {$:mod: [2,0]}}
*/

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

MongoClient.connect("mongodb://localhost/8080/dictionary", function(err, client){
    var myDB = client.db("dictionary");
    myDB.collection("wordCollection", findItems);
    let allCollections = [];
    
    /*myDB.listCollections().toArray(function(err, collections){
        // collections is an array of collection info objects that look like:
        // {name: 'test', options: {} }
        collections.forEach(eachCollectionDetails => {
            console.log(eachCollectionDetails.name);
        });
    });*/

   // console.log(allCollections[0]);

    setTimeout(function(){
        db.close();
    }, 3000);
});

function displayWords(msg, cursor, pretty){
    cursor.toArray(function(err, itemArr){
        console.log("\n"+msg);
        var wordList = [];
        for(var i=0; i<itemArr.length; i++){
            wordList.push(itemArr[i].word);
        }
        console.log(JSON.stringify(wordList, null, pretty));
    });
}

function findItems(err, words){
    words.find({first:{$in: ['a', 'b', 'c']}}, function(err, cursor){
        displayWords("Words starting with a, b or c: ", cursor);
    });
    words.find({size:{$gt: 12}}, function(err, cursor){
        displayWords("Words longer than 12 characters: ", cursor);
    });
    words.find({size:{$mod: [2,0]}}, function(err, cursor){
        displayWords("Words with even lengths: ", cursor);
    });
    words.find({letters:{$size: 12}}, function(err, cursor){
        displayWords("Words with 12 distinct letters: ", cursor);
    });
    words.find({$and: [{first: {$in:['a', 'e', 'i', 'o', 'u']}}, {last: {$in:['a', 'e', 'i', 'o', 'u']}}]}, function(err, cursor){
        displayWords("Words that start or end with a vowel", cursor);
    });

    // I don't think this part is going to work because we didn't include a 'stats' section of the 'word' object
    // word object only has: word, first, last, size, and letters properties. but we can still see what it's trying to do.
    words.find({"stats.vowels":{$gt: 6}}, function(err, cursor){
        displayWords("Words containing 7 or more vowels", cursor);
    });
}