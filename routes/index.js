var express = require('express');
var router = express.Router();
var Portfolio = require('../models/Portfolio');
var passport = require('../services/google');

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
