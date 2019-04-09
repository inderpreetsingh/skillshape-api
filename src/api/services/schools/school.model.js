const mongoose = require("mongoose");
const httpStatus = require("http-status");
const { omitBy, isNil } = require("lodash");
const bcrypt = require("bcryptjs");
const moment = require("moment-timezone");
const jwt = require("jwt-simple");
import crypto from "crypto";
const uuidv4 = require("uuid/v4");
import SHA256 from "sha256";
const APIError = require("../../utils/APIError");
const {
  env,
  jwtSecret,
  jwtExpirationInterval
} = require("../../../config/vars");

/**
 * School Schema
 * @private
 */
const SchoolSchema = new mongoose.Schema({
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
  },
  phone: {
    type: String,
    optional: true
  },
  claimed: {
    type: String,
    optional: true
  },
  logoImg: {
    type: String,
    optional: true
  },
  logoImgMedium: {
    type: String,
    optional: true
  },
  logoImgLow: {
    type: String,
    optional: true
  },
  topBarColor: {
    type: String,
    optional: true
  },
  bodyColour: {
    type: String,
    optional: true
  },
  backGroundVideoUrl: {
    type: String,
    optional: true
  },
  moduleColour: {
    type: String,
    optional: true
  },
  font: {
    type: String,
    optional: true
  },
  mainImage: {
    type: String,
    optional: true
  },
  mainImageLow: {
    type: String,
    optional: true
  },
  mainImageMedium: {
    type: String,
    optional: true
  },
  aboutHtml: {
    type: String,
    optional: true
  },
  studentNotesHtml: {
    type: String,
    optional: true
  },
  scoreMin: {
    type: String,
    optional: true
  },
  scoreMax: {
    type: String,
    optional: true
  },
  userId: {
    type: String,
    optional: true
  },
  email: {
    type: String,
    optional: true
  },
  firstName: {
    type: String,
    optional: true
  },
  lastName: {
    type: String,
    optional: true
  },
  admins: {
    type: [String],
    optional: true
  },
  superAdmin: {
    type: String,
    optional: true
  },
  isPublish: {
    type: Boolean,
    optional: true
  },
  currency: {
    type: String,
    optional: true
  }
});

/**
 * @typedef School
 */
module.exports = mongoose.model("School", SchoolSchema, "School");