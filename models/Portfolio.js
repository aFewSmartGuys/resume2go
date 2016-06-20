var mongoose = require("mongoose");

var portfolioSchema = mongoose.Schema({
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
  });

var Rezoomae = mongoose.model('Portflio', portfolioSchema);

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
    console.log(updatedContent);
    return new Promise(function(resolve, reject) {
      Rezoomae.findOneAndUpdate({'id':updatedContent.meta.id},updatedContent,
      {
        upsert:true,
        returnNewDocument: true
      }, function(err, doc) {
        if (err) {
          reject(err);
        } else {
          console.log(doc);
          resolve(doc);
        }
      });
    });
  }
};