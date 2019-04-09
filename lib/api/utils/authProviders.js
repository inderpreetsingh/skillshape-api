'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable camelcase */
var axios = require('axios');

exports.facebook = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(access_token) {
    var fields, url, params, response, _response$data, id, name, email, picture;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fields = 'id, name, email, picture';
            url = 'https://graph.facebook.com/me';
            params = { access_token: access_token, fields: fields };
            _context.next = 5;
            return axios.get(url, { params: params });

          case 5:
            response = _context.sent;
            _response$data = response.data, id = _response$data.id, name = _response$data.name, email = _response$data.email, picture = _response$data.picture;
            return _context.abrupt('return', {
              service: 'facebook',
              picture: picture.data.url,
              id: id,
              name: name,
              email: email
            });

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.google = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(access_token) {
    var url, params, response, _response$data2, sub, name, email, picture;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            url = 'https://www.googleapis.com/oauth2/v3/userinfo';
            params = { access_token: access_token };
            _context2.next = 4;
            return axios.get(url, { params: params });

          case 4:
            response = _context2.sent;
            _response$data2 = response.data, sub = _response$data2.sub, name = _response$data2.name, email = _response$data2.email, picture = _response$data2.picture;
            return _context2.abrupt('return', {
              service: 'google',
              picture: picture,
              id: sub,
              name: name,
              email: email
            });

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}();