var dbo = require('./dbo');

var portfolioSchema = dbo.Schema({
    meta:{
      title: String,
      mainImagePath: String,
      phone: String
    },
    content: [{
      String: String
    }]
  },
  {collection: 'portfolios'});

var Portfolio = dbo.model('Portfolio', portfolioSchema);

module.exports = {
  /**
   * Get all links
   */
  getAll: function() {
    return new Promise(function(resolve, reject) {
      Link.find(function(err, links) {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(links);
      });
    });
  },

  addLink: function(link) {
    return new Promise(function(resolve) {
      var l = new Link(link);
      l.save(function(err, obj) {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  },

  removeLink: function(linkId) {
    link.findOne({_id: linkId}, function(err, link) {
      console.log("delete link");
      console.log(link);
      link.remove(function(err) {
        if (err) {
          return false;
        } else {
          return true;
        }
      });
    });
  }
};