var express = require('express');
var router = express.Router();
var Portfolio = require('../models/Portfolio');
var User = require("../models/User");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET the json content from the mongo db */
router.get('/content', function(req, res, next) {
	User.getDPId().then(function(pid) {
		Portfolio.get(pid).then(function(data){
			res.setHeader("Content-Type", "application/json");
			res.json(data || {error: "Could not find any portfolios"});
		}, function(err){
			res.setHeader("Content-Type", "application/json");
			res.status(500).json(err);
		});
	}, function(err) {
		res.setHeader("Content-Type", "application/json");
		res.status(500).json(err);
	});
});

module.exports = router;
