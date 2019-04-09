'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var httpStatus = require('http-status');
var passport = require('passport');
var User = require('../services/user/user.model');
var APIError = require('../utils/APIError');

var ADMIN = 'admin';
var LOGGED_USER = '_loggedUser';

var handleJWT = function handleJWT(req, res, next, roles) {
  return function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(err, user, info) {
      var error, logIn, apiError;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              error = err || info;
              logIn = _promise2.default.promisify(req.logIn);
              apiError = new APIError({
                message: error ? error.message : 'Unauthorized',
                status: httpStatus.UNAUTHORIZED,
                stack: error ? error.stack : undefined
              });
              _context.prev = 3;

              if (!(error || !user)) {
                _context.next = 6;
                break;
              }

              throw error;

            case 6:
              _context.next = 8;
              return logIn(user, { session: false });

            case 8:
              _context.next = 13;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context['catch'](3);
              return _context.abrupt('return', next(apiError));

            case 13:
              if (!(roles === LOGGED_USER)) {
                _context.next = 20;
                break;
              }

              if (!(user.role !== 'admin' && req.params.userId !== user._id.toString())) {
                _context.next = 18;
                break;
              }

              apiError.status = httpStatus.FORBIDDEN;
              apiError.message = 'Forbidden';
              return _context.abrupt('return', next(apiError));

            case 18:
              _context.next = 28;
              break;

            case 20:
              if (roles.includes(user.role)) {
                _context.next = 26;
                break;
              }

              apiError.status = httpStatus.FORBIDDEN;
              apiError.message = 'Forbidden';
              return _context.abrupt('return', next(apiError));

            case 26:
              if (!(err || !user)) {
                _context.next = 28;
                break;
              }

              return _context.abrupt('return', next(apiError));

            case 28:

              req.user = user;

              return _context.abrupt('return', next());

            case 30:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[3, 10]]);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
};

exports.ADMIN = ADMIN;
exports.LOGGED_USER = LOGGED_USER;

exports.authorize = function () {
  var roles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : User.roles;
  return function (req, res, next) {
    return passport.authenticate('jwt', { session: false }, handleJWT(req, res, next, roles))(req, res, next);
  };
};

exports.oAuth = function (service) {
  return passport.authenticate(service, { session: false });
};