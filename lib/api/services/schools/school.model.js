"use strict";

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
 * School Schema
 * @private
 */


var SchoolSchema = new mongoose.Schema((_ref = {
  _id: {
    type: String
  },
  is_publish: {
    type: String,
    optional: true
  },
  name: {
    type: String,
    optional: true
  },
  website: {
    type: String,
    optional: true
  },
  phone: {
    type: String,
    optional: true
  },
  schooldesc: {
    type: String,
    optional: true
  },
  address: {
    type: String,
    optional: true
  },
  schoolGroupId: {
    type: String,
    optional: true
  },
  tag: {
    type: String,
    optional: true
  },
  quote: {
    type: String,
    optional: true
  },
  message: {
    type: String,
    optional: true
  },
  categoryCalled: {
    type: String,
    optional: true
  },
  subjectCalled: {
    type: String,
    optional: true
  },
  levelCalled: {
    type: String,
    optional: true
  }
}, (0, _defineProperty3.default)(_ref, "phone", {
  type: String,
  optional: true
}), (0, _defineProperty3.default)(_ref, "claimed", {
  type: String,
  optional: true
}), (0, _defineProperty3.default)(_ref, "logoImg", {
  type: String,
  optional: true
}), (0, _defineProperty3.default)(_ref, "logoImgMedium", {
  type: String,
  optional: true
}), (0, _defineProperty3.default)(_ref, "logoImgLow", {
  type: String,
  optional: true
}), (0, _defineProperty3.default)(_ref, "topBarColor", {
  type: String,
  optional: true
}), (0, _defineProperty3.default)(_ref, "bodyColour", {
  type: String,
  optional: true
}), (0, _defineProperty3.default)(_ref, "backGroundVideoUrl", {
  type: String,
  optional: true
}), (0, _defineProperty3.default)(_ref, "moduleColour", {
  type: String,
  optional: true
}), (0, _defineProperty3.default)(_ref, "font", {
  type: String,
  optional: true
}), (0, _defineProperty3.default)(_ref, "mainImage", {
  type: String,
  optional: true
}), (0, _defineProperty3.default)(_ref, "mainImageLow", {
  type: String,
  optional: true
}), (0, _defineProperty3.default)(_ref, "mainImageMedium", {
  type: String,
  optional: true
}), (0, _defineProperty3.default)(_ref, "aboutHtml", {
  type: String,
  optional: true
}), (0, _defineProperty3.default)(_ref, "studentNotesHtml", {
  type: String,
  optional: true
}), (0, _defineProperty3.default)(_ref, "scoreMin", {
  type: String,
  optional: true
}), (0, _defineProperty3.default)(_ref, "scoreMax", {
  type: String,
  optional: true
}), (0, _defineProperty3.default)(_ref, "userId", {
  type: String,
  optional: true
}), (0, _defineProperty3.default)(_ref, "email", {
  type: String,
  optional: true
}), (0, _defineProperty3.default)(_ref, "firstName", {
  type: String,
  optional: true
}), (0, _defineProperty3.default)(_ref, "lastName", {
  type: String,
  optional: true
}), (0, _defineProperty3.default)(_ref, "admins", {
  type: [String],
  optional: true
}), (0, _defineProperty3.default)(_ref, "superAdmin", {
  type: String,
  optional: true
}), (0, _defineProperty3.default)(_ref, "isPublish", {
  type: Boolean,
  optional: true
}), (0, _defineProperty3.default)(_ref, "currency", {
  type: String,
  optional: true
}), _ref));

/**
 * @typedef School
 */
module.exports = mongoose.model("School", SchoolSchema, "School");