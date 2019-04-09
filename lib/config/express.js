'use strict';

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var cors = require('cors');
var helmet = require('helmet');
var passport = require('passport');
var routes = require('../api/routes/v1');

var _require = require('./vars'),
    logs = _require.logs;

var strategies = require('./passport');
var error = require('../api/middlewares/error');
var rateLimiter = require('../api/middlewares/rateLimiter');

/**
* Express instance
* @public
*/
var app = express();

// request logging. dev: console | production: file
app.use(morgan(logs));

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// gzip compression
app.use(compress());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// enable authentication
app.use(passport.initialize());
passport.use('jwt', strategies.jwt);
passport.use('facebook', strategies.facebook);
passport.use('google', strategies.google);

app.use('/docs', express.static('docs'));

// enable rate limit
app.use(rateLimiter());

// mount api v1 routes
app.use('/v1', routes);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

module.exports = app;