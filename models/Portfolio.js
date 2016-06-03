var dbo = require('./dbo');

var portfolioSchema = dbo.Schema({
    meta:{
      title: {type: String, required: true},
      mainImage: String,
      phone: String
    },
    content: [{
      String: {type: String, required: true}
    }]
  },
  {collection: 'portfolio'});

var RezoomaeSchema = dbo.model('Rezoomae', portfolioSchema);

module.exports = {

  get: function() {
    return new Promise(function(resolve, reject) {
      RezoomaeSchema.findOne({}, function(err, content) {
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
      RezoomaeSchema.update({'_id':content._id},updatedContent,{multi:false, upsert:true})
    });
  }
};