/*********************************************************\
  Set up mongoose in order to connect to mongo database 
\*********************************************************/
var mongoose = require('mongoose');

var db = mongoose.createConnection('mongodb://localhost/rezoomae');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() { console.log('Connected to database.'); });

module.exports = mongoose;