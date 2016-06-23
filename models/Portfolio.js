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

var Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = {

	/**
	 * @param id is the string used to identify a specific portfolio
	 */
	get: function(id) {
		return new Promise(function(resolve, reject) {
			Portfolio.find({"id": id}, function(err, content) {
				if (err) {
					console.log(err);
					reject(err);
				}
				resolve(content);
			});
		});
	},

	getAll: function() {
		return new Promise(function(resolve, reject) {
			Portfolio.find({}, function(err, content) {
				if (err) {
					console.log(err);
					reject(err);
				}
				resolve(content);
			});
		});
	},

	write: function(updatedContent) {
		return new Promise(function(resolve, reject) {
			Portfolio.findOneAndUpdate({'id':updatedContent.meta.id},updatedContent,
			{
				upsert:true,
				returnNewDocument: true
			}, function(err, doc) {
				if (err) {
					reject(err);
				} else {
					resolve(doc);
				}
			});
		});
	},

	delete: function(id) {
		return new Promise(function(resolve, reject) {
			Portfolio.findOneAndRemove({id: id}, function(err, doc) {
				if (err) reject(err);
				else resolve(doc);
			});
		});
	}
};
