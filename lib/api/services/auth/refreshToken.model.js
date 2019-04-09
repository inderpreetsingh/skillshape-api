'use strict';

var mongoose = require('mongoose');
var crypto = require('crypto');
var moment = require('moment-timezone');

/**
 * Refresh Token Schema
 * @private
 */
var refreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    index: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userEmail: {
    type: 'String',
    ref: 'User',
    required: true
  },
  expires: { type: Date }
});

refreshTokenSchema.statics = {

  /**
   * Generate a refresh token object and saves it into the database
   *
   * @param {User} user
   * @returns {RefreshToken}
   */
  generate: function generate(user) {
    var userId = user._id;
    var userEmail = user.email;
    var token = userId + '.' + crypto.randomBytes(40).toString('hex');
    var expires = moment().add(30, 'days').toDate();
    var tokenObject = new RefreshToken({
      token: token, userId: userId, userEmail: userEmail, expires: expires
    });
    tokenObject.save();
    return tokenObject;
  }
};

/**
 * @typedef RefreshToken
 */
var RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);
module.exports = RefreshToken;