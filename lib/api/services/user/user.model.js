"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _ref;

var _crypto = require("crypto");

var _crypto2 = _interopRequireDefault(_crypto);

var _sha = require("sha256");

var _sha2 = _interopRequireDefault(_sha);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoose = require("mongoose");
var httpStatus = require("http-status");

var _require = require("lodash"),
    omitBy = _require.omitBy,
    isNil = _require.isNil;

var bcrypt = require("bcryptjs");
var moment = require("moment-timezone");
var jwt = require("jwt-simple");

var uuidv4 = require("uuid/v4");

var APIError = require("../../utils/APIError");

var _require2 = require("../../../config/vars"),
    env = _require2.env,
    jwtSecret = _require2.jwtSecret,
    jwtExpirationInterval = _require2.jwtExpirationInterval;

/**
 * User Roles
 */


var roles = ["user", "admin"];
/** 
 * User Profile
 * @private
*/
var UserProfile = {

  name: {
    type: String,
    optional: true
  },
  firstName: {
    optional: true,
    type: String
  },
  lastName: {
    optional: true,
    type: String
  },
  nickame: {
    optional: true,
    type: String
  },
  url: {
    optional: true,
    type: String
  },
  phone: {
    optional: true,
    type: String
  },
  pic: {
    optional: true,
    type: String
  },
  medium: {
    optional: true,
    type: String
  },
  low: {
    optional: true,
    type: String
  },
  dob: {
    optional: true,
    type: Date
  },
  address: {
    optional: true,
    type: String
  },
  gender: {
    optional: true,
    type: String
  },
  desc: {
    optional: true,
    type: String
  },
  expertise: {
    optional: true,
    type: String
  },
  state: {
    optional: true,
    type: String
  },
  user_type: {
    optional: true,
    type: String,
    allowedValues: ["C", "P", "S", "T"]
  },
  company_id: {
    optional: true,
    type: String
  },
  role: {
    optional: true,
    type: String
  },
  access_key: {
    type: String,
    optional: true
  },
  is_demo_user: {
    type: Boolean,
    optional: true
  },
  acess_type: {
    type: String,
    optional: true
  },
  classIds: {
    type: [String],
    optional: true
  },
  schoolId: {
    type: [String],
    optional: true
  },
  passwordSetByUser: {
    type: Boolean,
    optional: true
  },
  sendMeSkillShapeNotification: {
    type: Boolean,
    optional: true
  },
  userType: {
    type: String,
    optional: true
  },
  about: {
    type: String,
    optional: true
  },
  currency: {
    type: String,
    optional: true
  },
  birthYear: {
    type: Number,
    optional: true
  },
  coords: {
    type: [Number], // [<longitude>, <latitude>]
    index: "2d", // create the geospatial index
    optional: true,
    decimal: true
  },
  stripeStatus: {
    type: Boolean,
    optional: true,
    defaultValue: false
  }
};

/**
 * User Schema
 * @private
 */
var userSchema = new mongoose.Schema((_ref = {
  _id: {
    type: String
  },
  emails: [{
    address: {
      type: String,
      unique: true,
      required: true
    },
    verified: {
      type: Boolean,
      default: false
    }
  }],

  services: {
    facebook: {},
    google: {},
    password: { bcrypt: String }
  },
  username: {
    type: String,
    // For accounts-password, either emails or username is required, but not both. It is OK to make this
    // optional here because the accounts-password package does its own validation.
    // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
    optional: true
  },
  profile: {
    type: UserProfile,
    optional: true
  }
}, (0, _defineProperty3.default)(_ref, "emails", {
  type: Array,
  // For accounts-password, either emails or username is required, but not both. It is OK to make this
  // optional here because the accounts-password package does its own validation.
  // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
  optional: true
}), (0, _defineProperty3.default)(_ref, "createdAt", {
  type: Date,
  optional: true
}), (0, _defineProperty3.default)(_ref, "roles", {
  type: Array,
  optional: true
}), (0, _defineProperty3.default)(_ref, "roles.$", {
  type: String,
  optional: true
}), (0, _defineProperty3.default)(_ref, "media_access_permission", {
  type: String,
  optional: true
}), (0, _defineProperty3.default)(_ref, "sign_up_service", {
  type: String,
  optional: true
}), (0, _defineProperty3.default)(_ref, "term_cond_accepted", {
  type: Boolean,
  optional: true
}), (0, _defineProperty3.default)(_ref, "stripeCusIds", {
  type: Array,
  optional: true
}), (0, _defineProperty3.default)(_ref, "stripeCusIds.$", {
  type: String,
  optional: true
}), (0, _defineProperty3.default)(_ref, "refresh_token", {
  type: String,
  optional: true
}), (0, _defineProperty3.default)(_ref, "googleCalendarId", {
  type: String,
  optional: true
}), (0, _defineProperty3.default)(_ref, "savedByUser", {
  type: Boolean,
  optional: true
}), _ref));

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
userSchema.pre("save", function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(next) {
    var hash;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            console.log("TCL: save -> this", this);

            if (this.isModified("services.password")) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", next());

          case 4:
            _context.next = 6;
            return bcrypt.hash((0, _sha2.default)(this.services.password.bcrypt), 10);

          case 6:
            hash = _context.sent;

            this.services = { password: { bcrypt: hash } };
            return _context.abrupt("return", next());

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", next(_context.t0));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 11]]);
  }));

  function save(_x) {
    return _ref2.apply(this, arguments);
  }

  return save;
}());

/**
 * Methods
 */
userSchema.method({
  transform: function transform() {
    var _this = this;

    var transformed = {};
    var fields = ["id", "name", "email", "picture", "role", "createdAt"];

    fields.forEach(function (field) {
      transformed[field] = _this[field];
    });

    return transformed;
  },
  token: function token() {
    var playload = {
      exp: moment().add(jwtExpirationInterval, "minutes").unix(),
      iat: moment().unix(),
      sub: this._id
    };
    return jwt.encode(playload, jwtSecret);
  },


  // checking if password is valid

  passwordMatches: function passwordMatches(password) {
    var _this2 = this;

    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var encryptedPassword;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              encryptedPassword = _crypto2.default.createHash('sha256').update(password).digest('hex');
              return _context2.abrupt("return", bcrypt.compareSync(encryptedPassword, _this2.services.password.bcrypt));

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    }))();
  }
});

/**
 * Statics
 */
userSchema.statics = {
  roles: roles,

  /**
   * Get user
   *
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get: function get(id) {
    var _this3 = this;

    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
      var user;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              user = void 0;

              if (!mongoose.Types.ObjectId.isValid(id)) {
                _context3.next = 6;
                break;
              }

              _context3.next = 5;
              return _this3.findById(id).exec();

            case 5:
              user = _context3.sent;

            case 6:
              if (!user) {
                _context3.next = 8;
                break;
              }

              return _context3.abrupt("return", user);

            case 8:
              throw new APIError({
                message: "User does not exist",
                status: httpStatus.NOT_FOUND
              });

            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3["catch"](0);
              throw _context3.t0;

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, _this3, [[0, 11]]);
    }))();
  },


  /**
   * Find user by email and tries to generate a JWT token
   *
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  findAndGenerateToken: function findAndGenerateToken(options) {
    var _this4 = this;

    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
      var email, password, refreshObject, user, err;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              email = options.email, password = options.password, refreshObject = options.refreshObject;

              if (email) {
                _context4.next = 3;
                break;
              }

              throw new APIError({
                message: "An email is required to generate a token"
              });

            case 3:
              _context4.next = 5;
              return _this4.findOne({ "emails.address": email }).exec();

            case 5:
              user = _context4.sent;
              err = {
                status: httpStatus.UNAUTHORIZED,
                isPublic: true
              };

              if (!password) {
                _context4.next = 18;
                break;
              }

              _context4.t0 = user;

              if (!_context4.t0) {
                _context4.next = 13;
                break;
              }

              _context4.next = 12;
              return user.passwordMatches(password);

            case 12:
              _context4.t0 = _context4.sent;

            case 13:
              if (!_context4.t0) {
                _context4.next = 15;
                break;
              }

              return _context4.abrupt("return", { user: user, accessToken: user.token() });

            case 15:

              err.message = "Incorrect email or password";
              _context4.next = 23;
              break;

            case 18:
              if (!(refreshObject && refreshObject.userEmail === email)) {
                _context4.next = 22;
                break;
              }

              return _context4.abrupt("return", { user: user, accessToken: user.token() });

            case 22:
              err.message = "Incorrect email or refreshToken";

            case 23:
              throw new APIError(err);

            case 24:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, _this4);
    }))();
  },


  /**
   * List users in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list: function list(_ref3) {
    var _ref3$page = _ref3.page,
        page = _ref3$page === undefined ? 1 : _ref3$page,
        _ref3$perPage = _ref3.perPage,
        perPage = _ref3$perPage === undefined ? 30 : _ref3$perPage,
        name = _ref3.name,
        email = _ref3.email,
        role = _ref3.role;

    var options = omitBy({ name: name, email: email, role: role }, isNil);

    return this.find(options).sort({ createdAt: -1 }).skip(perPage * (page - 1)).limit(perPage).exec();
  },


  /**
   * Return new validation error
   * if error is a mongoose duplicate key error
   *
   * @param {Error} error
   * @returns {Error|APIError}
   */
  checkDuplicateEmail: function checkDuplicateEmail(error) {
    if (error.code === 11000 && (error.name === "BulkWriteError" || error.name === "MongoError")) {
      return new APIError({
        message: "Validation Error",
        errors: [{
          field: "email",
          location: "body",
          messages: ['"email" already exists']
        }],
        status: httpStatus.CONFLICT,
        isPublic: true,
        stack: error.stack
      });
    }
    return error;
  },
  oAuthLogin: function oAuthLogin(_ref4) {
    var _this5 = this;

    var service = _ref4.service,
        id = _ref4.id,
        email = _ref4.email,
        name = _ref4.name,
        picture = _ref4.picture;
    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
      var user, password;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _this5.findOne({
                $or: [(0, _defineProperty3.default)({}, "services." + service, id), { email: email }]
              });

            case 2:
              user = _context5.sent;

              if (!user) {
                _context5.next = 8;
                break;
              }

              user.services[service] = id;
              if (!user.name) user.name = name;
              if (!user.picture) user.picture = picture;
              return _context5.abrupt("return", user.save());

            case 8:
              password = uuidv4();
              return _context5.abrupt("return", _this5.create({
                services: (0, _defineProperty3.default)({}, service, id),
                email: email,
                password: password,
                name: name,
                picture: picture
              }));

            case 10:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, _this5);
    }))();
  }
};

/**
 * @typedef User
 */
module.exports = mongoose.model("User", userSchema);