var dbo = require('./dbo');

var portfolioSchema = dbo.Schema({
    meta:{
      title: String,
      mainImagePath: String,
      phone: String,
      id: { type : String , unique : true, required : true, dropDups: true }
    },
    content: [{
      title: String,
      content: String
    }]
  },
  {collection: 'portfolio'});

var Rezoomae = dbo.model('Rezoomae', portfolioSchema);

module.exports = {

  /**
   * @param id is the string used to identify a specific portfolio
   */
  get: function(id) {
    return new Promise(function(resolve, reject) {
      Rezoomae.findOne({"id": id}, function(err, content) {
        if (err) {
          console.log(err);
          reject(err);
        }
        console.log(content);
        resolve(content);
      });
    });
  },

  getAll: function() {
    return new Promise(function(resolve, reject) {
      Rezoomae.find({}, function(err, content) {
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
    console.log(updatedContent.meta.id);
    return new Promise(function(resolve, reject) {
      Rezoomae.findOneAndUpdate({'id':updatedContent.meta.id},updatedContent,{upsert:true}, function(err, doc) {
        if (err) {
          reject(err);
        } else {
          resolve(doc);
        }
      })
    });
  }
};