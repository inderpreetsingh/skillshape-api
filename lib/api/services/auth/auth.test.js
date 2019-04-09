'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable arrow-body-style */
var request = require('supertest');
var httpStatus = require('http-status');

var _require = require('chai'),
    expect = _require.expect;

var sinon = require('sinon');
var app = require('../../../index');
var User = require('../user/user.model');
var RefreshToken = require('./refreshToken.model');
var authProviders = require('../../utils/authProviders');

var sandbox = sinon.createSandbox();

var fakeOAuthRequest = function fakeOAuthRequest() {
  return _promise2.default.resolve({
    service: 'facebook',
    id: '123',
    name: 'user',
    email: 'test@test.com',
    picture: 'test.jpg'
  });
};

describe('Authentication API', function () {
  var dbUser = void 0;
  var user = void 0;
  var refreshToken = void 0;

  beforeEach((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dbUser = {
              email: 'branstark@gmail.com',
              password: 'mypassword',
              name: 'Bran Stark',
              role: 'admin'
            };

            user = {
              email: 'sousa.dfs@gmail.com',
              password: '123456',
              name: 'Daniel Sousa'
            };

            refreshToken = {
              token: '5947397b323ae82d8c3a333b.c69d0435e62c9f4953af912442a3d064e20291f0d228c0552ed4be473e7d191ba40b18c2c47e8b9d',
              userId: '5947397b323ae82d8c3a333b',
              userEmail: dbUser.email,
              expires: new Date()
            };

            _context.next = 5;
            return User.remove({});

          case 5:
            _context.next = 7;
            return User.create(dbUser);

          case 7:
            _context.next = 9;
            return RefreshToken.remove({});

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  afterEach(function () {
    return sandbox.restore();
  });

  describe('POST /v1/auth/register', function () {
    it('should register a new user when request is ok', function () {
      return request(app).post('/v1/auth/register').send(user).expect(httpStatus.CREATED).then(function (res) {
        delete user.password;
        expect(res.body.token).to.have.a.property('accessToken');
        expect(res.body.token).to.have.a.property('refreshToken');
        expect(res.body.token).to.have.a.property('expiresIn');
        expect(res.body.user).to.include(user);
      });
    });

    it('should report error when email already exists', function () {
      return request(app).post('/v1/auth/register').send(dbUser).expect(httpStatus.CONFLICT).then(function (res) {
        var field = res.body.errors[0].field;
        var location = res.body.errors[0].location;
        var messages = res.body.errors[0].messages;

        expect(field).to.be.equal('email');
        expect(location).to.be.equal('body');
        expect(messages).to.include('"email" already exists');
      });
    });

    it('should report error when the email provided is not valid', function () {
      user.email = 'this_is_not_an_email';
      return request(app).post('/v1/auth/register').send(user).expect(httpStatus.BAD_REQUEST).then(function (res) {
        var field = res.body.errors[0].field;
        var location = res.body.errors[0].location;
        var messages = res.body.errors[0].messages;

        expect(field).to.be.equal('email');
        expect(location).to.be.equal('body');
        expect(messages).to.include('"email" must be a valid email');
      });
    });

    it('should report error when email and password are not provided', function () {
      return request(app).post('/v1/auth/register').send({}).expect(httpStatus.BAD_REQUEST).then(function (res) {
        var field = res.body.errors[0].field;
        var location = res.body.errors[0].location;
        var messages = res.body.errors[0].messages;

        expect(field).to.be.equal('email');
        expect(location).to.be.equal('body');
        expect(messages).to.include('"email" is required');
      });
    });
  });

  describe('POST /v1/auth/login', function () {
    it('should return an accessToken and a refreshToken when email and password matches', function () {
      return request(app).post('/v1/auth/login').send(dbUser).expect(httpStatus.OK).then(function (res) {
        delete dbUser.password;
        expect(res.body.token).to.have.a.property('accessToken');
        expect(res.body.token).to.have.a.property('refreshToken');
        expect(res.body.token).to.have.a.property('expiresIn');
        expect(res.body.user).to.include(dbUser);
      });
    });

    it('should report error when email and password are not provided', function () {
      return request(app).post('/v1/auth/login').send({}).expect(httpStatus.BAD_REQUEST).then(function (res) {
        var field = res.body.errors[0].field;
        var location = res.body.errors[0].location;
        var messages = res.body.errors[0].messages;

        expect(field).to.be.equal('email');
        expect(location).to.be.equal('body');
        expect(messages).to.include('"email" is required');
      });
    });

    it('should report error when the email provided is not valid', function () {
      user.email = 'this_is_not_an_email';
      return request(app).post('/v1/auth/login').send(user).expect(httpStatus.BAD_REQUEST).then(function (res) {
        var field = res.body.errors[0].field;
        var location = res.body.errors[0].location;
        var messages = res.body.errors[0].messages;

        expect(field).to.be.equal('email');
        expect(location).to.be.equal('body');
        expect(messages).to.include('"email" must be a valid email');
      });
    });

    it('should report error when email and password don\'t match', function () {
      dbUser.password = 'xxx';
      return request(app).post('/v1/auth/login').send(dbUser).expect(httpStatus.UNAUTHORIZED).then(function (res) {
        var code = res.body.code;
        var message = res.body.message;

        expect(code).to.be.equal(401);
        expect(message).to.be.equal('Incorrect email or password');
      });
    });
  });

  describe('POST /v1/auth/facebook', function () {
    it('should create a new user and return an accessToken when user does not exist', function () {
      sandbox.stub(authProviders, 'facebook').callsFake(fakeOAuthRequest);
      return request(app).post('/v1/auth/facebook').send({ access_token: '123' }).expect(httpStatus.OK).then(function (res) {
        expect(res.body.token).to.have.a.property('accessToken');
        expect(res.body.token).to.have.a.property('refreshToken');
        expect(res.body.token).to.have.a.property('expiresIn');
        expect(res.body.user).to.be.an('object');
      });
    });

    it('should return an accessToken when user already exists', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              dbUser.email = 'test@test.com';
              _context2.next = 3;
              return User.create(dbUser);

            case 3:
              sandbox.stub(authProviders, 'facebook').callsFake(fakeOAuthRequest);
              return _context2.abrupt('return', request(app).post('/v1/auth/facebook').send({ access_token: '123' }).expect(httpStatus.OK).then(function (res) {
                expect(res.body.token).to.have.a.property('accessToken');
                expect(res.body.token).to.have.a.property('refreshToken');
                expect(res.body.token).to.have.a.property('expiresIn');
                expect(res.body.user).to.be.an('object');
              }));

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    })));

    it('should return error when access_token is not provided', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt('return', request(app).post('/v1/auth/facebook').expect(httpStatus.BAD_REQUEST).then(function (res) {
                var field = res.body.errors[0].field;
                var location = res.body.errors[0].location;
                var messages = res.body.errors[0].messages;

                expect(field).to.be.equal('access_token');
                expect(location).to.be.equal('body');
                expect(messages).to.include('"access_token" is required');
              }));

            case 1:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    })));
  });

  describe('POST /v1/auth/google', function () {
    it('should create a new user and return an accessToken when user does not exist', function () {
      sandbox.stub(authProviders, 'google').callsFake(fakeOAuthRequest);
      return request(app).post('/v1/auth/google').send({ access_token: '123' }).expect(httpStatus.OK).then(function (res) {
        expect(res.body.token).to.have.a.property('accessToken');
        expect(res.body.token).to.have.a.property('refreshToken');
        expect(res.body.token).to.have.a.property('expiresIn');
        expect(res.body.user).to.be.an('object');
      });
    });

    it('should return an accessToken when user already exists', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              dbUser.email = 'test@test.com';
              _context4.next = 3;
              return User.create(dbUser);

            case 3:
              sandbox.stub(authProviders, 'google').callsFake(fakeOAuthRequest);
              return _context4.abrupt('return', request(app).post('/v1/auth/google').send({ access_token: '123' }).expect(httpStatus.OK).then(function (res) {
                expect(res.body.token).to.have.a.property('accessToken');
                expect(res.body.token).to.have.a.property('refreshToken');
                expect(res.body.token).to.have.a.property('expiresIn');
                expect(res.body.user).to.be.an('object');
              }));

            case 5:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    })));

    it('should return error when access_token is not provided', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              return _context5.abrupt('return', request(app).post('/v1/auth/google').expect(httpStatus.BAD_REQUEST).then(function (res) {
                var field = res.body.errors[0].field;
                var location = res.body.errors[0].location;
                var messages = res.body.errors[0].messages;

                expect(field).to.be.equal('access_token');
                expect(location).to.be.equal('body');
                expect(messages).to.include('"access_token" is required');
              }));

            case 1:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    })));
  });

  describe('POST /v1/auth/refresh-token', function () {
    it('should return a new accessToken when refreshToken and email match', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return RefreshToken.create(refreshToken);

            case 2:
              return _context6.abrupt('return', request(app).post('/v1/auth/refresh-token').send({ email: dbUser.email, refreshToken: refreshToken.token }).expect(httpStatus.OK).then(function (res) {
                expect(res.body).to.have.a.property('accessToken');
                expect(res.body).to.have.a.property('refreshToken');
                expect(res.body).to.have.a.property('expiresIn');
              }));

            case 3:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    })));

    it('should report error when email and refreshToken don\'t match', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return RefreshToken.create(refreshToken);

            case 2:
              return _context7.abrupt('return', request(app).post('/v1/auth/refresh-token').send({ email: user.email, refreshToken: refreshToken.token }).expect(httpStatus.UNAUTHORIZED).then(function (res) {
                var code = res.body.code;
                var message = res.body.message;

                expect(code).to.be.equal(401);
                expect(message).to.be.equal('Incorrect email or refreshToken');
              }));

            case 3:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined);
    })));

    it('should report error when email and refreshToken are not provided', function () {
      return request(app).post('/v1/auth/refresh-token').send({}).expect(httpStatus.BAD_REQUEST).then(function (res) {
        var field1 = res.body.errors[0].field;
        var location1 = res.body.errors[0].location;
        var messages1 = res.body.errors[0].messages;
        var field2 = res.body.errors[1].field;
        var location2 = res.body.errors[1].location;
        var messages2 = res.body.errors[1].messages;
        expect(field1).to.be.equal('email');
        expect(location1).to.be.equal('body');
        expect(messages1).to.include('"email" is required');
        expect(field2).to.be.equal('refreshToken');
        expect(location2).to.be.equal('body');
        expect(messages2).to.include('"refreshToken" is required');
      });
    });
  });
});