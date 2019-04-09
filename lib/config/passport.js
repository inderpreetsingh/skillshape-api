'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JwtStrategy = require('passport-jwt').Strategy;
var BearerStrategy = require('passport-http-bearer');

var _require = require('passport-jwt'),
    ExtractJwt = _require.ExtractJwt;

var _require2 = require('./vars'),
    jwtSecret = _require2.jwtSecret;

var authProviders = require('../api/utils/authProviders');
var User = require('../api/services/user/user.model');

var jwtOptions = {
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer')
};

var jwt = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(payload, done) {
    var user;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return User.findById(payload.sub);

          case 3:
            user = _context.sent;

            if (!user) {
              _context.next = 6;
              break;
            }

            return _context.abrupt('return', done(null, user));

          case 6:
            return _context.abrupt('return', done(null, false));

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](0);
            return _context.abrupt('return', done(_context.t0, false));

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 9]]);
  }));

  return function jwt(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var oAuth = function oAuth(service) {
  return function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(token, done) {
      var userData, user;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return authProviders[service](token);

            case 3:
              userData = _context2.sent;
              _context2.next = 6;
              return User.oAuthLogin(userData);

            case 6:
              user = _context2.sent;
              return _context2.abrupt('return', done(null, user));

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2['catch'](0);
              return _context2.abrupt('return', done(_context2.t0));

            case 13:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 10]]);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();
};

exports.jwt = new JwtStrategy(jwtOptions, jwt);
exports.facebook = new BearerStrategy(oAuth('facebook'));
exports.google = new BearerStrategy(oAuth('google'));