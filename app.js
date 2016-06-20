var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var user = require('./routes/user');

// create global connection to mongoDB
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/rezoomae');
db.connection.on('error', console.error.bind(console, 'connection error:'));
db.connection.once('open', function() { console.log('Connected to database.'); });
var User = require('./models/User');

var app = express();

var sessions = require("client-sessions");
app.use(sessions({
  cookieName: 'session', // cookie name dictates the key name added to the request object
  secret: 'akfj45qa$WERQ#$G[s]ELDF+nqowe', // should be a large unguessable string
  duration: 45 * 60 * 1000, // how long the session will stay valid in ms
  activeDuration: 5 * 60 * 1000, // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
  ephemeral: true // resets the cookies when the browser closes
}));

app.use(function(req, res, next) {
  if (req.session && req.session.name) {
	console.log("session name: " + req.session.name);
    User.getPortfolio({ name: req.session.name }).then(function(portfolio) {
      res.locals.portfolio = portfolio;
    }, function(msg) {
      console.log("Cookie middleware: " + msg);
      req.session.reset();
    });
  }
  console.log("going to next");
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/user', user);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
