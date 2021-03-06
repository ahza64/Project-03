// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    auth = require('./middleware/auth'),
    controllers = require("./controllers");

// require and load dotenv
require('dotenv').load();

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// log api requests
app.use(logger('dev'));

/*
 * Auth Routes
 */

var usersCtrl = controllers.users;
app.post('/auth/signup', usersCtrl.signup);
app.post('/auth/login', usersCtrl.login);
app.get('/api/me', auth.ensureAuthenticated, usersCtrl.showCurrentUser);
app.put('/api/me', auth.ensureAuthenticated, usersCtrl.updateCurrentUser);

/*
 * API Routes
 */

var secretsCtrl = controllers.secrets;
app.get('/api/secrets', secretsCtrl.index);
app.post('/api/secrets', auth.ensureAuthenticated, secretsCtrl.create);
app.get('/api/secrets/:id', secretsCtrl.show);
app.put('/api/secrets/:id', auth.ensureAuthenticated, secretsCtrl.update);
app.delete('/api/secrets/:id', auth.ensureAuthenticated, secretsCtrl.destroy);


/*
 * Catch All Route
 */
app.get(['/', '/signup', '/login', '/logout', '/profile', '/secrets*'], function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.use('/vendor', express.static(__dirname + '/bower_components'));


/*
 * Listen on localhost:9000
 */
var port = process.env.PORT || 9000;
app.listen(port, function() {
  console.log('server started on port ', port);
});
