var express = require('express');
var router = express.Router();
var passport = require('../services/google');

router.get('/', function(req, res, next) {
	//check cookie
	// send to dashboard if session exists
	res.render('login');
});

router.post('/auth', function(req, res, next) {
	var body = req.body;
	console.log(body);
	res.send("Authentication Not Yet Implemented.");
});

router.post('/register', function(req, res, next) {
	var body = req.body;
	console.log(body);
	res.send("userCreation Not Yet Implemented.");
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
