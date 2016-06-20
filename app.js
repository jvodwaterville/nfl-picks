var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var sessions = require('client-sessions');
var csrf = require('csurf');
var models = require('./models');
var middleware = require('./middleware');

// Database connection
//var mongo = require('mongodb');
//var monk = require('monk');
//var db = monk('localhost:27017/nfl-picks');

//mongoose db connection
mongoose.connect('mongodb://localhost:27017/nfl-picks');

//test connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

//set routes
var routes = require('./routes/index');
var users = require('./routes/users');
var selections = require('./routes/selections');
var leagues = require('./routes/leagues');

var app = express();

//Middleware
//set session cookie
app.use(sessions({
  cookieName: 'session',
  secret: '8nxwx931T]9Q1R4#b2/a:+-5lvKZU1oc9P46ld}0p(&LyD7D63*!8oU5I)1|i[b', // should be a large unguessable string or Buffer
  duration: 1 * 60 * 60 * 1000, // how long the session will stay valid in ms
    httpOnly: true,
    secure: true,
    ephemeral: true,
}));

//set session details
app.use(middleware.simpleAuth);

function requireLogin(req,res,next){
    if(!req.user){
        res.redirect('/');
    } else {
        next();
    }
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public/images/layout', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(csrf());
app.use(express.static(path.join(__dirname, 'public')));

//use routes
app.use('/', routes);
app.use('/users', users);
app.use('/selections', selections);
app.use('/leagues', leagues);

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
