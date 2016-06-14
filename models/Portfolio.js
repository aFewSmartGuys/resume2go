var dbo = require('./dbo');

var portfolioSchema = dbo.Schema({
    meta:{
      title: String,
      mainImagePath: String,
      phone: String,
      identifier: { type : String , unique : true, required : true, dropDups: true }
    },
    content: [{
      title: String,
      content: String
    }]
  },
  {collection: 'portfolio'});

var Rezoomae = dbo.model('Rezoomae', portfolioSchema);

module.exports = {

  get: function() {
    return new Promise(function(resolve, reject) {
      Rezoomae.findOne({}, function(err, content) {
        if (err) {
          console.log(err);
          reject(err);
        }
        console.log(content);
        resolve(content);
      });
    });
  },

  write: function(updatedContent) {
    console.log(updatedContent);
    return new Promise(function(resolve, reject) {
      Rezoomae.findOneAndUpdate({'identifier':updatedContent.meta.identifier},updatedContent,{upsert:true}, function(err, doc) {
        if (err) {
          reject(err);
        } else {
          resolve(doc);
        }
      })
    });
  }
};