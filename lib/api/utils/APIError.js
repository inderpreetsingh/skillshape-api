'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var httpStatus = require('http-status');

/**
 * @extends Error
 */

var ExtendableError = function (_Error) {
  (0, _inherits3.default)(ExtendableError, _Error);

  function ExtendableError(_ref) {
    var message = _ref.message,
        errors = _ref.errors,
        status = _ref.status,
        isPublic = _ref.isPublic,
        stack = _ref.stack;
    (0, _classCallCheck3.default)(this, ExtendableError);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ExtendableError.__proto__ || (0, _getPrototypeOf2.default)(ExtendableError)).call(this, message));

    _this.name = _this.constructor.name;
    _this.message = message;
    _this.errors = errors;
    _this.status = status;
    _this.isPublic = isPublic;
    _this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
    _this.stack = stack;
    // Error.captureStackTrace(this, this.constructor.name);
    return _this;
  }

  return ExtendableError;
}(Error);

/**
 * Class representing an API error.
 * @extends ExtendableError
 */


var APIError = function (_ExtendableError) {
  (0, _inherits3.default)(APIError, _ExtendableError);

  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  function APIError(_ref2) {
    var message = _ref2.message,
        errors = _ref2.errors,
        stack = _ref2.stack,
        _ref2$status = _ref2.status,
        status = _ref2$status === undefined ? httpStatus.INTERNAL_SERVER_ERROR : _ref2$status,
        _ref2$isPublic = _ref2.isPublic,
        isPublic = _ref2$isPublic === undefined ? false : _ref2$isPublic;
    (0, _classCallCheck3.default)(this, APIError);
    return (0, _possibleConstructorReturn3.default)(this, (APIError.__proto__ || (0, _getPrototypeOf2.default)(APIError)).call(this, {
      message: message, errors: errors, status: status, isPublic: isPublic, stack: stack
    }));
  }

  return APIError;
}(ExtendableError);

module.exports = APIError;