'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var httpStatus = require('http-status');
var service = require('./user.service');

var _require = require('../../middlewares/error'),
    errorHandler = _require.handler;

/**
 * Load user and append to req.
 * @public
 */


exports.load = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next, id) {
    var user;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return service.get(id);

          case 3:
            user = _context.sent;

            req.locals = { user: user };
            return _context.abrupt('return', next());

          case 8:
            _context.prev = 8;
            _context.t0 = _context['catch'](0);
            return _context.abrupt('return', errorHandler(_context.t0, req, res));

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 8]]);
  }));

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Get user
 * @public
 */
exports.get = function (req, res) {
  return res.json(req.locals.user.transform());
};

/**
 * Get logged in user info
 * @public
 */
exports.loggedIn = function (req, res) {
  return res.json(req.user.transform());
};

/**
 * Create new user
 * @public
 */
exports.create = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res, next) {
    var response;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return service.create(req.body);

          case 3:
            response = _context2.sent;
            return _context2.abrupt('return', res.status(httpStatus.CREATED).json(response));

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2['catch'](0);
            return _context2.abrupt('return', next(_context2.t0));

          case 10:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 7]]);
  }));

  return function (_x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Replace existing user
 * @public
 */
exports.replace = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res, next) {
    var user, response;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            user = req.locals.user;
            _context3.next = 4;
            return service.replace(user, req.body);

          case 4:
            response = _context3.sent;
            return _context3.abrupt('return', res.json(response));

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3['catch'](0);
            return _context3.abrupt('return', next(_context3.t0));

          case 11:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 8]]);
  }));

  return function (_x8, _x9, _x10) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Update existing user
 * @public
 */
exports.update = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res, next) {
    var user, response;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            user = req.locals.user;
            _context4.next = 4;
            return service.update(user, req.body);

          case 4:
            response = _context4.sent;
            return _context4.abrupt('return', res.json(response));

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4['catch'](0);
            return _context4.abrupt('return', next(_context4.t0));

          case 11:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 8]]);
  }));

  return function (_x11, _x12, _x13) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Get user list
 * @public
 */
exports.list = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res, next) {
    var response;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return service.list(req.query);

          case 3:
            response = _context5.sent;

            res.json(response);
            _context5.next = 10;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5['catch'](0);

            next(_context5.t0);

          case 10:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 7]]);
  }));

  return function (_x14, _x15, _x16) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * Delete user
 * @public
 */
exports.remove = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res, next) {
    var user;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            user = req.locals.user;
            _context6.next = 4;
            return service.remove(user);

          case 4:
            res.status(httpStatus.NO_CONTENT).end();
            _context6.next = 10;
            break;

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6['catch'](0);

            next(_context6.t0);

          case 10:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[0, 7]]);
  }));

  return function (_x17, _x18, _x19) {
    return _ref6.apply(this, arguments);
  };
}();