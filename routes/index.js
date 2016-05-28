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

/* GET the json content from the mongo db */
router.get('/content', function(req, res, next) {
	Portfolio.get().then(function(data){
		res.setHeader("Content-Type", "application/json");
		res.json(data.length > 0 ? data[0] : {});
	}, function(err){
		console.log("error getting the content");
		res.json("{error:" + err + "}");
	})
});

module.exports = router;
