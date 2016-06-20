var express = require('express');
var router = express.Router();
var passport = require('../services/google');
var Portfolio = require('../models/Portfolio');
var User = require("../models/User");

function sessionCheck(req, res, next) {
	console.log("In session check")
	console.log(req.session);
	if (req.session && req.session.name) {
		console.log("Going to next");
		next();
	} else {
		console.log("redirecting to login");
		res.render('login');
	}
}

router.get('/logout', function(req, res, next) {
	req.session.reset();
	res.render('login');
});

router.get('/', sessionCheck, function(req, res, next) {
	res.render('dashboard');
});

/* POST save updated content to the database */
router.post('/save', sessionCheck, function(req, res, next) {
	console.log("in the save function");
	Portfolio.write(req.body).then(function(data) {
		res.status(200);
	}, function(err) {
		console.log("error saving updated content");
		res.status(500);
	});
});

/* GET all json content from the mongo db */
router.get('/content', function(req, res, next) {
	console.log("Getting all content");
	Portfolio.getAll().then(function(data){
		res.setHeader("Content-Type", "application/json");
		res.json(data || {error: "Could not find any portfolios"});
	}, function(err){
		res.setHeader("Content-Type", "application/json");
		res.status(500).json([]);
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
			req.session.name = body.name;
			res.render('dashboard', {success:responseText});
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
		console.log("Trying to create the session for the user");
		req.session.name = name;
		console.log(req.session);
		res.render("dashboard");
	}, function(responseText) {
		req.session.reset();
		res.status(400).json({error: "error logging in."});
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
