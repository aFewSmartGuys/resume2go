var dbo = require('./dbo');

var portfolioSchema = dbo.Schema({
    meta:{
      title: String,
      mainImage: String,
      phone: String
    },
    content: [{
      String: String
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
    return new Promise(function(resolve) {
      Rezoomae.update({'_id':content._id},updatedContent,{multi:false, upsert:true})
    });
  }
};