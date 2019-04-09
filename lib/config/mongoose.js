'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoose = require('mongoose');

var _require = require('./vars'),
    mongo = _require.mongo,
    env = _require.env;

// set mongoose Promise to Bluebird


mongoose.Promise = _promise2.default;

// Exit application on error
mongoose.connection.on('error', function (err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// print mongoose logs in dev env
if (env === 'development') {
  mongoose.set('debug', true);
}

/**
* Connect to mongo db
*
* @returns {object} Mongoose connection
* @public
*/
exports.connect = function () {
  mongoose.connect(mongo.uri, {
    keepAlive: 1
  });
  return mongoose.connection;
};