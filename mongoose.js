// connecting to a MongoDB database using mongoose
// it's very similar to the usual way tbh
// once you have mongodb and node.js installed, write this in the command line using npm:
// npm install mongoose

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/words');
mongoose.connection.on('open', function(){
    mongoose.connection.db.createCollection('yeehaw');
    mongoose.connection.db.listCollections().toArray(function (err, names) {
        console.log(names); // [{ name: 'dbname.myCollection' }]
        module.exports.Collection = names;
    });
});