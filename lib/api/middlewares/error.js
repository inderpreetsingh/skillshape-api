'use strict';

var httpStatus = require('http-status');
var expressValidation = require('express-validation');
var APIError = require('../utils/APIError');

var _require = require('../../config/vars'),
    env = _require.env;

/**
 * Error handler. Send stacktrace only during development
 * @public
 */


var handler = function handler(err, req, res, next) {
  var response = {
    code: err.status,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack
  };
  if (env !== 'development') {
    delete response.stack;
  }
  res.status(err.status);
  res.json(response);
  res.end();
};
exports.handler = handler;

/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
exports.converter = function (err, req, res, next) {
  var convertedError = err;

  if (err instanceof expressValidation.ValidationError) {
    var errors = err.errors.map(function (e) {
      return {
        location: e.location,
        messages: e.messages,
        field: e.field[0]
      };
    });
    convertedError = new APIError({
      message: 'Validation Error',
      errors: errors,
      status: err.status,
      stack: err.stack
    });
  } else if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message,
      status: err.status,
      stack: err.stack
    });
  }
  return handler(convertedError, req, res);
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
exports.notFound = function (req, res, next) {
  var err = new APIError({
    message: 'Not found',
    status: httpStatus.NOT_FOUND
  });
  return handler(err, req, res);
};

/**
 * Catch 429 ratelimit exceeded
 * @public
 */
exports.rateLimitHandler = function (req, res, next) {
  var err = new APIError({
    message: 'Rate limt exceeded, please try again later some time.',
    status: httpStatus.TOO_MANY_REQUESTS
  });
  return handler(err, req, res);
};