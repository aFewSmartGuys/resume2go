var express = require('express');
var router = express.Router();
var passport = require('../services/google');
var Portfolio = require('../models/Portfolio');
var User = require("../models/User");

function sessionCheck(req, res, next) {
	if (req.session && req.session.name) {
		User.getDisplayPortfolio(req.session.name).then(function(portfolioId) {
			res.locals.errMsg = null;
			res.locals.displayPortfolio = portfolioId;
		}, function(msg) {
			res.locals.errMsg = "Incorrect username.";
			req.session.reset();
			res.render('login');
		});
		next();
	} else {
		res.locals.errMsg = "You are not logged in";
		res.render('login');
	}
}

function sessionCheckRest(req, res, next) {
	if (req.session && req.session.name) {
		User.getDisplayPortfolio(req.session.name).then(function(portfolioId) {
			res.locals.errMsg = null;
			res.locals.displayPortfolio = portfolioId;
		}, function(msg) {
			res.locals.errMsg = "Incorrect username.";
			req.session.reset();
			res.status(403).json({error: res.locals.errMsg});
		});
		next();
	} else {
		res.locals.errMsg = "You are not logged in.";
		req.session.reset();
		res.status(403).json({error: res.locals.errMsg});
	}
}

router.get('/logout', function(req, res, next) {
	req.session.reset();
	res.render('login');
});

router.get('/', sessionCheck, function(req, res, next) {
	res.render('dashboard');
});

/* POST save updated portfolio to the database */
router.post('/save', sessionCheckRest, function(req, res, next) {
	if (typeof req.body.meta.id === "string" && req.body.meta.id === "") {
		res.locals.errMsg = "You must specify an Id before saving a portfolio.";
		res.status(400).json({error:res.locals.errMsg});
	}
	Portfolio.write(req.body).then(function(data) {
		res.status(200).json({success:"portfolio saved"});
	}, function(err) {
		res.locals.errMsg = "Error saving portfolio";
		res.status(500).json({error:res.locals.errMsg});
	});
});

/* POST update the portfolio to display in the database */
router.post('/displayPortfolio/update', sessionCheckRest, function(req, res, next) {
	User.updateDisplayPortfolio(req.body.pid, req.session.name).then(function(data) {
		res.status(200).json({success:"display portfolio updated"});
	}, function(err) {
		res.locals.errMsg = "Could not update portfolio";
		res.status(500).json({error:res.locals.errMsg});
	});
});

/* POST delete a portfolio */
router.post('/portfolio/delete', sessionCheckRest, function(req, res, next) {
	Portfolio.delete(req.body.id).then(function(data) {
		res.status(200).json({success:"display portfolio deleted"});
	}, function(err) {
		res.locals.errMsg = "Could not delete portfolio";
		res.status(500).json({error:res.locals.errMsg});
	});
});

/* GET all json content from the mongo db */
router.get('/content', sessionCheckRest, function(req, res, next) {
	Portfolio.getAll().then(function(portfolios){
		var response = {
			displayPortfolio: res.locals.displayPortfolio,
			portfolios: portfolios
		};
		if (!res.locals.displayPortfolio) {
			User.getDisplayPortfolio(req.session.name).then(function(displayPortfolio){
				response.displayPortfolio = displayPortfolio;
				res.setHeader("Content-Type", "application/json");
				res.json(response);
			},function(err){
				res.status(500).json({error:"Could not find display Portfolio."});
			});
		} else {
			res.setHeader("Content-Type", "application/json");
			res.json(response);
		}
	}, function(err){
		res.setHeader("Content-Type", "application/json");
		res.status(500).json({});
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
	User.login({name:name, password:password}).then(function(portfolio) {
		//set the session
		req.session.name = name;
		res.locals.portfolio = portfolio;
		res.render("dashboard");
	}, function(responseText) {
		req.session.reset();
		res.status(400).json({error: "error logging in."});
	});
});

router.post('/auth', function(req, res, next) {
	var body = req.body;
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
