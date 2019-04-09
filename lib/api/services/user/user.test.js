'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * root level hooks
 */

var format = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(user) {
    var formated, dbUser;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            formated = user;

            // delete password

            delete formated.password;

            // get users from database
            _context.next = 4;
            return User.findOne({ email: user.email });

          case 4:
            dbUser = _context.sent.transform();
            return _context.abrupt('return', omitBy(dbUser, isNil));

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function format(_x) {
    return _ref.apply(this, arguments);
  };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-expressions */
var request = require('supertest');
var httpStatus = require('http-status');

var _require = require('chai'),
    expect = _require.expect;

var sinon = require('sinon');
var bcrypt = require('bcryptjs');

var _require2 = require('lodash'),
    some = _require2.some,
    omitBy = _require2.omitBy,
    isNil = _require2.isNil;

var app = require('../../../index');
var User = require('./user.model');
var JWT_EXPIRATION = require('../../../config/vars').jwtExpirationInterval;

describe('Users API', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee21() {
  var adminAccessToken, userAccessToken, dbUsers, user, admin, password, passwordHashed;
  return _regenerator2.default.wrap(function _callee21$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          adminAccessToken = void 0;
          userAccessToken = void 0;
          dbUsers = void 0;
          user = void 0;
          admin = void 0;
          password = '123456';
          _context21.next = 8;
          return bcrypt.hash(password, 1);

        case 8:
          passwordHashed = _context21.sent;


          beforeEach((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
            return _regenerator2.default.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    dbUsers = {
                      branStark: {
                        email: 'branstark@gmail.com',
                        password: passwordHashed,
                        name: 'Bran Stark',
                        role: 'admin'
                      },
                      jonSnow: {
                        email: 'jonsnow@gmail.com',
                        password: passwordHashed,
                        name: 'Jon Snow'
                      }
                    };

                    user = {
                      email: 'sousa.dfs@gmail.com',
                      password: password,
                      name: 'Daniel Sousa'
                    };

                    admin = {
                      email: 'sousa.dfs@gmail.com',
                      password: password,
                      name: 'Daniel Sousa',
                      role: 'admin'
                    };

                    _context2.next = 5;
                    return User.remove({});

                  case 5:
                    _context2.next = 7;
                    return User.insertMany([dbUsers.branStark, dbUsers.jonSnow]);

                  case 7:
                    dbUsers.branStark.password = password;
                    dbUsers.jonSnow.password = password;
                    _context2.next = 11;
                    return User.findAndGenerateToken(dbUsers.branStark);

                  case 11:
                    adminAccessToken = _context2.sent.accessToken;
                    _context2.next = 14;
                    return User.findAndGenerateToken(dbUsers.jonSnow);

                  case 14:
                    userAccessToken = _context2.sent.accessToken;

                  case 15:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee2, undefined);
          })));

          describe('POST /v1/users', function () {
            it('should create a new user when request is ok', function () {
              return request(app).post('/v1/users').set('Authorization', 'Bearer ' + adminAccessToken).send(admin).expect(httpStatus.CREATED).then(function (res) {
                delete admin.password;
                expect(res.body).to.include(admin);
              });
            });

            it('should create a new user and set default role to "user"', function () {
              return request(app).post('/v1/users').set('Authorization', 'Bearer ' + adminAccessToken).send(user).expect(httpStatus.CREATED).then(function (res) {
                expect(res.body.role).to.be.equal('user');
              });
            });

            it('should report error when email already exists', function () {
              user.email = dbUsers.branStark.email;

              return request(app).post('/v1/users').set('Authorization', 'Bearer ' + adminAccessToken).send(user).expect(httpStatus.CONFLICT).then(function (res) {
                var field = res.body.errors[0].field;
                var location = res.body.errors[0].location;
                var messages = res.body.errors[0].messages;

                expect(field).to.be.equal('email');
                expect(location).to.be.equal('body');
                expect(messages).to.include('"email" already exists');
              });
            });

            it('should report error when email is not provided', function () {
              delete user.email;

              return request(app).post('/v1/users').set('Authorization', 'Bearer ' + adminAccessToken).send(user).expect(httpStatus.BAD_REQUEST).then(function (res) {
                var field = res.body.errors[0].field;
                var location = res.body.errors[0].location;
                var messages = res.body.errors[0].messages;

                expect(field).to.be.equal('email');
                expect(location).to.be.equal('body');
                expect(messages).to.include('"email" is required');
              });
            });

            it('should report error when password length is less than 6', function () {
              user.password = '12345';

              return request(app).post('/v1/users').set('Authorization', 'Bearer ' + adminAccessToken).send(user).expect(httpStatus.BAD_REQUEST).then(function (res) {
                var field = res.body.errors[0].field;
                var location = res.body.errors[0].location;
                var messages = res.body.errors[0].messages;

                expect(field).to.be.equal('password');
                expect(location).to.be.equal('body');
                expect(messages).to.include('"password" length must be at least 6 characters long');
              });
            });

            it('should report error when logged user is not an admin', function () {
              return request(app).post('/v1/users').set('Authorization', 'Bearer ' + userAccessToken).send(user).expect(httpStatus.FORBIDDEN).then(function (res) {
                expect(res.body.code).to.be.equal(httpStatus.FORBIDDEN);
                expect(res.body.message).to.be.equal('Forbidden');
              });
            });
          });

          describe('GET /v1/users', function () {
            it('should get all users', function () {
              return request(app).get('/v1/users').set('Authorization', 'Bearer ' + adminAccessToken).expect(httpStatus.OK).then(function () {
                var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(res) {
                  var bran, john, includesBranStark, includesjonSnow;
                  return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          bran = format(dbUsers.branStark);
                          john = format(dbUsers.jonSnow);
                          includesBranStark = some(res.body, bran);
                          includesjonSnow = some(res.body, john);

                          // before comparing it is necessary to convert String to Date

                          res.body[0].createdAt = new Date(res.body[0].createdAt);
                          res.body[1].createdAt = new Date(res.body[1].createdAt);

                          expect(res.body).to.be.an('array');
                          expect(res.body).to.have.lengthOf(2);
                          expect(includesBranStark).to.be.true;
                          expect(includesjonSnow).to.be.true;

                        case 10:
                        case 'end':
                          return _context3.stop();
                      }
                    }
                  }, _callee3, undefined);
                }));

                return function (_x2) {
                  return _ref4.apply(this, arguments);
                };
              }());
            });

            it('should get all users with pagination', function () {
              return request(app).get('/v1/users').set('Authorization', 'Bearer ' + adminAccessToken).query({ page: 2, perPage: 1 }).expect(httpStatus.OK).then(function (res) {
                delete dbUsers.jonSnow.password;
                var john = format(dbUsers.jonSnow);
                var includesjonSnow = some(res.body, john);

                // before comparing it is necessary to convert String to Date
                res.body[0].createdAt = new Date(res.body[0].createdAt);

                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf(1);
                expect(includesjonSnow).to.be.true;
              });
            });

            it('should filter users', function () {
              return request(app).get('/v1/users').set('Authorization', 'Bearer ' + adminAccessToken).query({ email: dbUsers.jonSnow.email }).expect(httpStatus.OK).then(function (res) {
                delete dbUsers.jonSnow.password;
                var john = format(dbUsers.jonSnow);
                var includesjonSnow = some(res.body, john);

                // before comparing it is necessary to convert String to Date
                res.body[0].createdAt = new Date(res.body[0].createdAt);

                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf(1);
                expect(includesjonSnow).to.be.true;
              });
            });

            it('should report error when pagination\'s parameters are not a number', function () {
              return request(app).get('/v1/users').set('Authorization', 'Bearer ' + adminAccessToken).query({ page: '?', perPage: 'whaat' }).expect(httpStatus.BAD_REQUEST).then(function (res) {
                var field = res.body.errors[0].field;
                var location = res.body.errors[0].location;
                var messages = res.body.errors[0].messages;

                expect(field).to.be.equal('page');
                expect(location).to.be.equal('query');
                expect(messages).to.include('"page" must be a number');
                return _promise2.default.resolve(res);
              }).then(function (res) {
                var field = res.body.errors[1].field;
                var location = res.body.errors[1].location;
                var messages = res.body.errors[1].messages;

                expect(field).to.be.equal('perPage');
                expect(location).to.be.equal('query');
                expect(messages).to.include('"perPage" must be a number');
              });
            });

            it('should report error if logged user is not an admin', function () {
              return request(app).get('/v1/users').set('Authorization', 'Bearer ' + userAccessToken).expect(httpStatus.FORBIDDEN).then(function (res) {
                expect(res.body.code).to.be.equal(httpStatus.FORBIDDEN);
                expect(res.body.message).to.be.equal('Forbidden');
              });
            });
          });

          describe('GET /v1/users/:userId', function () {
            it('should get user', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
              var id;
              return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      _context4.next = 2;
                      return User.findOne({});

                    case 2:
                      id = _context4.sent._id;

                      delete dbUsers.branStark.password;

                      return _context4.abrupt('return', request(app).get('/v1/users/' + id).set('Authorization', 'Bearer ' + adminAccessToken).expect(httpStatus.OK).then(function (res) {
                        expect(res.body).to.include(dbUsers.branStark);
                      }));

                    case 5:
                    case 'end':
                      return _context4.stop();
                  }
                }
              }, _callee4, undefined);
            })));

            it('should report error "User does not exist" when user does not exists', function () {
              return request(app).get('/v1/users/56c787ccc67fc16ccc1a5e92').set('Authorization', 'Bearer ' + adminAccessToken).expect(httpStatus.NOT_FOUND).then(function (res) {
                expect(res.body.code).to.be.equal(404);
                expect(res.body.message).to.be.equal('User does not exist');
              });
            });

            it('should report error "User does not exist" when id is not a valid ObjectID', function () {
              return request(app).get('/v1/users/palmeiras1914').set('Authorization', 'Bearer ' + adminAccessToken).expect(httpStatus.NOT_FOUND).then(function (res) {
                expect(res.body.code).to.be.equal(404);
                expect(res.body.message).to.equal('User does not exist');
              });
            });

            it('should report error when logged user is not the same as the requested one', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
              var id;
              return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      _context5.next = 2;
                      return User.findOne({ email: dbUsers.branStark.email });

                    case 2:
                      id = _context5.sent._id;
                      return _context5.abrupt('return', request(app).get('/v1/users/' + id).set('Authorization', 'Bearer ' + userAccessToken).expect(httpStatus.FORBIDDEN).then(function (res) {
                        expect(res.body.code).to.be.equal(httpStatus.FORBIDDEN);
                        expect(res.body.message).to.be.equal('Forbidden');
                      }));

                    case 4:
                    case 'end':
                      return _context5.stop();
                  }
                }
              }, _callee5, undefined);
            })));
          });

          describe('PUT /v1/users/:userId', function () {
            it('should replace user', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
              var id;
              return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      delete dbUsers.branStark.password;
                      _context6.next = 3;
                      return User.findOne(dbUsers.branStark);

                    case 3:
                      id = _context6.sent._id;
                      return _context6.abrupt('return', request(app).put('/v1/users/' + id).set('Authorization', 'Bearer ' + adminAccessToken).send(user).expect(httpStatus.OK).then(function (res) {
                        delete user.password;
                        expect(res.body).to.include(user);
                        expect(res.body.role).to.be.equal('user');
                      }));

                    case 5:
                    case 'end':
                      return _context6.stop();
                  }
                }
              }, _callee6, undefined);
            })));

            it('should report error when email is not provided', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
              var id;
              return _regenerator2.default.wrap(function _callee7$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      _context7.next = 2;
                      return User.findOne({});

                    case 2:
                      id = _context7.sent._id;

                      delete user.email;

                      return _context7.abrupt('return', request(app).put('/v1/users/' + id).set('Authorization', 'Bearer ' + adminAccessToken).send(user).expect(httpStatus.BAD_REQUEST).then(function (res) {
                        var field = res.body.errors[0].field;
                        var location = res.body.errors[0].location;
                        var messages = res.body.errors[0].messages;

                        expect(field).to.be.equal('email');
                        expect(location).to.be.equal('body');
                        expect(messages).to.include('"email" is required');
                      }));

                    case 5:
                    case 'end':
                      return _context7.stop();
                  }
                }
              }, _callee7, undefined);
            })));

            it('should report error user when password length is less than 6', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
              var id;
              return _regenerator2.default.wrap(function _callee8$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      _context8.next = 2;
                      return User.findOne({});

                    case 2:
                      id = _context8.sent._id;

                      user.password = '12345';

                      return _context8.abrupt('return', request(app).put('/v1/users/' + id).set('Authorization', 'Bearer ' + adminAccessToken).send(user).expect(httpStatus.BAD_REQUEST).then(function (res) {
                        var field = res.body.errors[0].field;
                        var location = res.body.errors[0].location;
                        var messages = res.body.errors[0].messages;

                        expect(field).to.be.equal('password');
                        expect(location).to.be.equal('body');
                        expect(messages).to.include('"password" length must be at least 6 characters long');
                      }));

                    case 5:
                    case 'end':
                      return _context8.stop();
                  }
                }
              }, _callee8, undefined);
            })));

            it('should report error "User does not exist" when user does not exists', function () {
              return request(app).put('/v1/users/palmeiras1914').set('Authorization', 'Bearer ' + adminAccessToken).expect(httpStatus.NOT_FOUND).then(function (res) {
                expect(res.body.code).to.be.equal(404);
                expect(res.body.message).to.be.equal('User does not exist');
              });
            });

            it('should report error when logged user is not the same as the requested one', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9() {
              var id;
              return _regenerator2.default.wrap(function _callee9$(_context9) {
                while (1) {
                  switch (_context9.prev = _context9.next) {
                    case 0:
                      _context9.next = 2;
                      return User.findOne({ email: dbUsers.branStark.email });

                    case 2:
                      id = _context9.sent._id;
                      return _context9.abrupt('return', request(app).put('/v1/users/' + id).set('Authorization', 'Bearer ' + userAccessToken).expect(httpStatus.FORBIDDEN).then(function (res) {
                        expect(res.body.code).to.be.equal(httpStatus.FORBIDDEN);
                        expect(res.body.message).to.be.equal('Forbidden');
                      }));

                    case 4:
                    case 'end':
                      return _context9.stop();
                  }
                }
              }, _callee9, undefined);
            })));

            it('should not replace the role of the user (not admin)', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10() {
              var id, role;
              return _regenerator2.default.wrap(function _callee10$(_context10) {
                while (1) {
                  switch (_context10.prev = _context10.next) {
                    case 0:
                      _context10.next = 2;
                      return User.findOne({ email: dbUsers.jonSnow.email });

                    case 2:
                      id = _context10.sent._id;
                      role = 'admin';
                      return _context10.abrupt('return', request(app).put('/v1/users/' + id).set('Authorization', 'Bearer ' + userAccessToken).send(admin).expect(httpStatus.OK).then(function (res) {
                        expect(res.body.role).to.not.be.equal(role);
                      }));

                    case 5:
                    case 'end':
                      return _context10.stop();
                  }
                }
              }, _callee10, undefined);
            })));

            it('should not assign the already existing email', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11() {
              var id;
              return _regenerator2.default.wrap(function _callee11$(_context11) {
                while (1) {
                  switch (_context11.prev = _context11.next) {
                    case 0:
                      delete dbUsers.branStark.password;
                      _context11.next = 3;
                      return User.findOne(dbUsers.branStark);

                    case 3:
                      id = _context11.sent._id;

                      user.email = dbUsers.jonSnow.email;
                      return _context11.abrupt('return', request(app).put('/v1/users/' + id).set('Authorization', 'Bearer ' + adminAccessToken).send(user).expect(httpStatus.CONFLICT).then(function (res) {
                        var field = res.body.errors[0].field;
                        var location = res.body.errors[0].location;
                        var messages = res.body.errors[0].messages;

                        expect(field).to.be.equal('email');
                        expect(location).to.be.equal('body');
                        expect(messages).to.include('"email" already exists');
                      }));

                    case 6:
                    case 'end':
                      return _context11.stop();
                  }
                }
              }, _callee11, undefined);
            })));
          });

          describe('PATCH /v1/users/:userId', function () {
            it('should update user', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12() {
              var id, _user, name;

              return _regenerator2.default.wrap(function _callee12$(_context12) {
                while (1) {
                  switch (_context12.prev = _context12.next) {
                    case 0:
                      delete dbUsers.branStark.password;
                      _context12.next = 3;
                      return User.findOne(dbUsers.branStark);

                    case 3:
                      id = _context12.sent._id;
                      _user = user, name = _user.name;
                      return _context12.abrupt('return', request(app).patch('/v1/users/' + id).set('Authorization', 'Bearer ' + adminAccessToken).send({ name: name }).expect(httpStatus.OK).then(function (res) {
                        expect(res.body.name).to.be.equal(name);
                        expect(res.body.email).to.be.equal(dbUsers.branStark.email);
                      }));

                    case 6:
                    case 'end':
                      return _context12.stop();
                  }
                }
              }, _callee12, undefined);
            })));

            it('should not update user when no parameters were given', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13() {
              var id;
              return _regenerator2.default.wrap(function _callee13$(_context13) {
                while (1) {
                  switch (_context13.prev = _context13.next) {
                    case 0:
                      delete dbUsers.branStark.password;
                      _context13.next = 3;
                      return User.findOne(dbUsers.branStark);

                    case 3:
                      id = _context13.sent._id;
                      return _context13.abrupt('return', request(app).patch('/v1/users/' + id).set('Authorization', 'Bearer ' + adminAccessToken).send().expect(httpStatus.OK).then(function (res) {
                        expect(res.body).to.include(dbUsers.branStark);
                      }));

                    case 5:
                    case 'end':
                      return _context13.stop();
                  }
                }
              }, _callee13, undefined);
            })));

            it('should report error "User does not exist" when user does not exists', function () {
              return request(app).patch('/v1/users/palmeiras1914').set('Authorization', 'Bearer ' + adminAccessToken).expect(httpStatus.NOT_FOUND).then(function (res) {
                expect(res.body.code).to.be.equal(404);
                expect(res.body.message).to.be.equal('User does not exist');
              });
            });

            it('should report error when logged user is not the same as the requested one', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14() {
              var id;
              return _regenerator2.default.wrap(function _callee14$(_context14) {
                while (1) {
                  switch (_context14.prev = _context14.next) {
                    case 0:
                      _context14.next = 2;
                      return User.findOne({ email: dbUsers.branStark.email });

                    case 2:
                      id = _context14.sent._id;
                      return _context14.abrupt('return', request(app).patch('/v1/users/' + id).set('Authorization', 'Bearer ' + userAccessToken).expect(httpStatus.FORBIDDEN).then(function (res) {
                        expect(res.body.code).to.be.equal(httpStatus.FORBIDDEN);
                        expect(res.body.message).to.be.equal('Forbidden');
                      }));

                    case 4:
                    case 'end':
                      return _context14.stop();
                  }
                }
              }, _callee14, undefined);
            })));

            it('should not update the role of the user (not admin)', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15() {
              var id, role;
              return _regenerator2.default.wrap(function _callee15$(_context15) {
                while (1) {
                  switch (_context15.prev = _context15.next) {
                    case 0:
                      _context15.next = 2;
                      return User.findOne({ email: dbUsers.jonSnow.email });

                    case 2:
                      id = _context15.sent._id;
                      role = 'admin';
                      return _context15.abrupt('return', request(app).patch('/v1/users/' + id).set('Authorization', 'Bearer ' + userAccessToken).send({ role: role }).expect(httpStatus.OK).then(function (res) {
                        expect(res.body.role).to.not.be.equal(role);
                      }));

                    case 5:
                    case 'end':
                      return _context15.stop();
                  }
                }
              }, _callee15, undefined);
            })));

            it('should not assign the already existing email', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16() {
              var id;
              return _regenerator2.default.wrap(function _callee16$(_context16) {
                while (1) {
                  switch (_context16.prev = _context16.next) {
                    case 0:
                      delete dbUsers.branStark.password;
                      _context16.next = 3;
                      return User.findOne(dbUsers.branStark);

                    case 3:
                      id = _context16.sent._id;

                      user.email = dbUsers.jonSnow.email;
                      return _context16.abrupt('return', request(app).patch('/v1/users/' + id).set('Authorization', 'Bearer ' + adminAccessToken).send(user).expect(httpStatus.CONFLICT).then(function (res) {
                        var field = res.body.errors[0].field;
                        var location = res.body.errors[0].location;
                        var messages = res.body.errors[0].messages;

                        expect(field).to.be.equal('email');
                        expect(location).to.be.equal('body');
                        expect(messages).to.include('"email" already exists');
                      }));

                    case 6:
                    case 'end':
                      return _context16.stop();
                  }
                }
              }, _callee16, undefined);
            })));
          });

          describe('DELETE /v1/users', function () {
            it('should delete user', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee18() {
              var id;
              return _regenerator2.default.wrap(function _callee18$(_context18) {
                while (1) {
                  switch (_context18.prev = _context18.next) {
                    case 0:
                      _context18.next = 2;
                      return User.findOne({});

                    case 2:
                      id = _context18.sent._id;
                      return _context18.abrupt('return', request(app).delete('/v1/users/' + id).set('Authorization', 'Bearer ' + adminAccessToken).expect(httpStatus.NO_CONTENT).then(function () {
                        return request(app).get('/v1/users');
                      }).then((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee17() {
                        var users;
                        return _regenerator2.default.wrap(function _callee17$(_context17) {
                          while (1) {
                            switch (_context17.prev = _context17.next) {
                              case 0:
                                _context17.next = 2;
                                return User.find({});

                              case 2:
                                users = _context17.sent;

                                expect(users).to.have.lengthOf(1);

                              case 4:
                              case 'end':
                                return _context17.stop();
                            }
                          }
                        }, _callee17, undefined);
                      }))));

                    case 4:
                    case 'end':
                      return _context18.stop();
                  }
                }
              }, _callee18, undefined);
            })));

            it('should report error "User does not exist" when user does not exists', function () {
              return request(app).delete('/v1/users/palmeiras1914').set('Authorization', 'Bearer ' + adminAccessToken).expect(httpStatus.NOT_FOUND).then(function (res) {
                expect(res.body.code).to.be.equal(404);
                expect(res.body.message).to.be.equal('User does not exist');
              });
            });

            it('should report error when logged user is not the same as the requested one', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee19() {
              var id;
              return _regenerator2.default.wrap(function _callee19$(_context19) {
                while (1) {
                  switch (_context19.prev = _context19.next) {
                    case 0:
                      _context19.next = 2;
                      return User.findOne({ email: dbUsers.branStark.email });

                    case 2:
                      id = _context19.sent._id;
                      return _context19.abrupt('return', request(app).delete('/v1/users/' + id).set('Authorization', 'Bearer ' + userAccessToken).expect(httpStatus.FORBIDDEN).then(function (res) {
                        expect(res.body.code).to.be.equal(httpStatus.FORBIDDEN);
                        expect(res.body.message).to.be.equal('Forbidden');
                      }));

                    case 4:
                    case 'end':
                      return _context19.stop();
                  }
                }
              }, _callee19, undefined);
            })));
          });

          describe('GET /v1/users/profile', function () {
            it('should get the logged user\'s info', function () {
              delete dbUsers.jonSnow.password;

              return request(app).get('/v1/users/profile').set('Authorization', 'Bearer ' + userAccessToken).expect(httpStatus.OK).then(function (res) {
                expect(res.body).to.include(dbUsers.jonSnow);
              });
            });

            it('should report error without stacktrace when accessToken is expired', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee20() {
              var clock, expiredAccessToken;
              return _regenerator2.default.wrap(function _callee20$(_context20) {
                while (1) {
                  switch (_context20.prev = _context20.next) {
                    case 0:
                      // fake time
                      clock = sinon.useFakeTimers();
                      _context20.next = 3;
                      return User.findAndGenerateToken(dbUsers.branStark);

                    case 3:
                      expiredAccessToken = _context20.sent.accessToken;


                      // move clock forward by minutes set in config + 1 minute
                      clock.tick(JWT_EXPIRATION * 60000 + 60000);

                      return _context20.abrupt('return', request(app).get('/v1/users/profile').set('Authorization', 'Bearer ' + expiredAccessToken).expect(httpStatus.UNAUTHORIZED).then(function (res) {
                        expect(res.body.code).to.be.equal(httpStatus.UNAUTHORIZED);
                        expect(res.body.message).to.be.equal('jwt expired');
                        expect(res.body).to.not.have.a.property('stack');
                      }));

                    case 6:
                    case 'end':
                      return _context20.stop();
                  }
                }
              }, _callee20, undefined);
            })));
          });

          describe('GET /v1/not-found', function () {
            it('should return 404', function () {
              return request(app).get('/v1/not-found').expect(httpStatus.NOT_FOUND);
            });
          });

        case 18:
        case 'end':
          return _context21.stop();
      }
    }
  }, _callee21, undefined);
})));