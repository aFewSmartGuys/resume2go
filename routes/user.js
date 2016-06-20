var express = require('express');
var router = express.Router();
var passport = require('../services/google');
var Portfolio = require('../models/Portfolio');
var User = require("../models/User");

router.get('/', function(req, res, next) {
	//check cookie
	// send to dashboard if session exists
	res.render('login');
});

// router.get('/dashboard', function(req, res, next) {
// 	res.render("dashboard");
// });

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

/* GET all json content from the mongo db */
router.get('/content', function(req, res, next) {
	Portfolio.getAll().then(function(data){
		res.setHeader("Content-Type", "application/json");
		res.json(data || {error: "Could not find any portfolios"});
	}, function(err){
		console.log("error getting the content");
		res.setHeader("Content-Type", "application/json");
		res.status(500).json(err);
	});
});

router.post('/register', function(req, res, next) {
	var body = req.body;
	if (body.password !== body.password2) {
		res.json({error: "Passwords do not match."});
	} else {
		User.register({
			name: body.name,
			password: body.password,
			authType: "password",
			portfolio: body.portfolio || ""
		}).then(function(responseText) {
			res.json({success:responseText});
		}, function(responseText) {
			res.json({error:responseText});
		});
	}
});

router.post('/login', function(req, res, next) {
	var body = req.body,
		name = body.name || "",
		password = body.password || "";
	User.login({name:name, password:password}).then(function(responseText) {
		//set the session
		res.render("dashboard");
	}, function(responseText) {
		res.json({error:responseText});
	});
});

router.post('/auth', function(req, res, next) {
	var body = req.body;
	console.log(body);
	res.send("Authentication Not Yet Implemented.");
});

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
router.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
	function(req, res, next) {
		res.json('{success:"success yo"}');
	}
);

module.exports = router;
