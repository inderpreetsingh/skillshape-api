"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = require("../user/user.model");
var RefreshToken = require("./refreshToken.model");
var moment = require("moment-timezone");

var _require = require("../../../config/vars"),
    jwtExpirationInterval = _require.jwtExpirationInterval;

/**
 * Returns a formated object with tokens
 * @private
 */


function generateTokenResponse(user, accessToken) {
  var tokenType = "Bearer";
  var refreshToken = RefreshToken.generate(user).token;
  var expiresIn = moment().add(jwtExpirationInterval, "minutes");
  return {
    tokenType: tokenType,
    accessToken: accessToken,
    refreshToken: refreshToken,
    expiresIn: expiresIn
  };
}

/**
 * Returns jwt token if registration was successful
 * @public
 */
exports.signUp = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(userData) {
    var password, email, name, userType, sendMeSkillShapeNotification, birthYear, signUpType, nameModified, payLoad, user, userTransformed, token;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            password = userData.password, email = userData.email, name = userData.name, userType = userData.userType, sendMeSkillShapeNotification = userData.sendMeSkillShapeNotification, birthYear = userData.birthYear, signUpType = userData.signUpType;
            nameModified = name.split(" ");
            payLoad = {
              _id: _mongoose2.default.Types.ObjectId(),
              services: { password: { bcrypt: password } },
              emails: [{ address: email, verified: false }],
              profile: {
                firstName: nameModified[0],
                lastName: nameModified[1],
                userType: userType,
                sendMeSkillShapeNotification: sendMeSkillShapeNotification,
                birthYear: birthYear
              },
              sign_up_service: signUpType || "Unknown"
            };
            _context.next = 6;
            return new User(payLoad).save();

          case 6:
            user = _context.sent;
            userTransformed = user.transform();
            token = generateTokenResponse(user, user.token());
            return _context.abrupt("return", { token: token, user: userTransformed });

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            throw User.checkDuplicateEmail(_context.t0);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 12]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Returns jwt token if valid username and password is provided
 * @public
 */
exports.login = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(userData) {
    var _ref3, user, accessToken, token, userTransformed;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return User.findAndGenerateToken(userData);

          case 3:
            _ref3 = _context2.sent;
            user = _ref3.user;
            accessToken = _ref3.accessToken;
            token = generateTokenResponse(user, accessToken);
            userTransformed = user.transform();
            return _context2.abrupt("return", { token: token, user: userTransformed });

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);
            throw _context2.t0;

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 11]]);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * login with an existing user or creates a new one if valid accessToken token
 * Returns jwt token
 * @public
 */
exports.oAuth = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(user) {
    var accessToken, token, userTransformed;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            accessToken = user.token();
            token = generateTokenResponse(user, accessToken);
            userTransformed = user.transform();
            return _context3.abrupt("return", { token: token, user: userTransformed });

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            throw _context3.t0;

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 7]]);
  }));

  return function (_x3) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Returns a new jwt when given a valid refresh token
 * @public
 */
exports.refresh = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(_ref6) {
    var email = _ref6.email,
        refreshToken = _ref6.refreshToken;

    var refreshObject, _ref7, user, accessToken;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return RefreshToken.findOneAndRemove({
              userEmail: email,
              token: refreshToken
            });

          case 3:
            refreshObject = _context4.sent;
            _context4.next = 6;
            return User.findAndGenerateToken({
              email: email,
              refreshObject: refreshObject
            });

          case 6:
            _ref7 = _context4.sent;
            user = _ref7.user;
            accessToken = _ref7.accessToken;
            return _context4.abrupt("return", generateTokenResponse(user, accessToken));

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](0);
            throw _context4.t0;

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 12]]);
  }));

  return function (_x4) {
    return _ref5.apply(this, arguments);
  };
}();