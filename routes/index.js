var express = require('express');
var router = express.Router();
var Portfolio = require('../models/Portfolio');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

/* GET dashboard page. */
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', { title: 'Express' });
});

/* POST save updated content to the database */
router.post('/save', function(req, res, next) {
	Portfolio.write(req.body).then(function(data) {
		res.setHeader("Content-Type", "application/json");
		res.json("{response:" + data + "}");
	}, function(err) {
		console.log("error saving updated content");
		res.setHeader("Content-Type", "application/json");
		res.status(500).json(err);
	});
});

/* GET the json content from the mongo db */
router.get('/content', function(req, res, next) {
	Portfolio.get().then(function(data){
		res.setHeader("Content-Type", "application/json");
		res.json(data.length > 0 ? data[0] : {});
	}, function(err){
		console.log("error getting the content");
		res.setHeader("Content-Type", "application/json");
		res.status(500).json(err);
	})
});

module.exports = router;
