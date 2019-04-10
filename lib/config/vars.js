'use strict';

var _lodash = require('lodash');

var _dotenvSafe = require('dotenv-safe');

var _dotenvSafe2 = _interopRequireDefault(_dotenvSafe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');

var NODE_ENV = (0, _lodash.get)(process, 'env.NODE_ENV', 'development');
if (NODE_ENV === 'development') {
  // // import .env variables
  _dotenvSafe2.default.load({
    path: path.join(__dirname, '../../.env'),
    sample: path.join(__dirname, '../../.env.example')
  });
}

console.log('TCL: NODE_ENV', NODE_ENV);

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
  mongo: {
    uri: process.env.MONGO_URI
  },
  logs: process.env.NODE_ENV === 'dev',
  rateLimitTime: process.env.RATE_LIMIT_TIME,
  rateLimitRequest: process.env.RATE_LIMIT_REQUEST
};