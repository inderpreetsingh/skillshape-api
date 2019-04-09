'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('lodash'),
    omit = _require.omit;

var User = require('./user.model');
// const { handler: errorHandler } = require('../../middlewares/error');

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

            console.log(12);
            _context.next = 4;
            return User.get(id);

          case 4:
            user = _context.sent;

            req.locals = { user: user };
            return _context.abrupt('return', next());

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](0);
            return _context.abrupt('return', errorHandler(_context.t0, req, res));

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 9]]);
  }));

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Get user
 * @public
 */
exports.get = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(id) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', User.get(id));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x5) {
    return _ref2.apply(this, arguments);
  };
}();

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
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(userData) {
    var user, savedUser;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            user = new User(userData);
            _context3.next = 4;
            return user.save();

          case 4:
            savedUser = _context3.sent;
            return _context3.abrupt('return', savedUser.transform());

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3['catch'](0);
            throw User.checkDuplicateEmail(_context3.t0);

          case 11:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 8]]);
  }));

  return function (_x6) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Replace existing user
 * @public
 */
exports.replace = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(user, newUserData) {
    var newUser, ommitRole, newUserObject, savedUser;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            newUser = new User(newUserData);
            ommitRole = user.role !== 'admin' ? 'role' : '';
            newUserObject = omit(newUser.toObject(), '_id', ommitRole);
            _context4.next = 6;
            return user.update(newUserObject, { override: true, upsert: true });

          case 6:
            _context4.next = 8;
            return User.findById(user._id);

          case 8:
            savedUser = _context4.sent;
            return _context4.abrupt('return', savedUser.transform());

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4['catch'](0);
            throw User.checkDuplicateEmail(_context4.t0);

          case 15:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 12]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Update existing user
 * @public
 */
exports.update = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(user, updatedData) {
    var ommitRole, userTobeUpdated, updatedUser, savedUser;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            ommitRole = user.role !== 'admin' ? 'role' : '';
            userTobeUpdated = omit(updatedData, ommitRole);
            updatedUser = (0, _assign2.default)(user, userTobeUpdated);
            _context5.next = 6;
            return updatedUser.save();

          case 6:
            savedUser = _context5.sent;
            return _context5.abrupt('return', savedUser.transform());

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5['catch'](0);
            throw User.checkDuplicateEmail(_context5.t0);

          case 13:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 10]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * Get user list
 * @public
 */
exports.list = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(params) {
    var users, transformedUsers;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return User.list(params);

          case 3:
            users = _context6.sent;
            transformedUsers = users.map(function (user) {
              return user.transform();
            });
            return _context6.abrupt('return', transformedUsers);

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6['catch'](0);
            throw _context6.t0;

          case 11:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[0, 8]]);
  }));

  return function (_x11) {
    return _ref6.apply(this, arguments);
  };
}();

/**
 * Delete user
 * @public
 */
exports.remove = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(user) {
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt('return', user.remove());

          case 1:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function (_x12) {
    return _ref7.apply(this, arguments);
  };
}();