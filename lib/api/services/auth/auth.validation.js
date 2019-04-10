'use strict';

var Joi = require('joi');

module.exports = {
  // POST /v1/auth/signUp
  signUp: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6).max(128),
      userType: Joi.string(),
      sendMeSkillShapeNotification: Joi.boolean(),
      signUpType: Joi.string(),
      birthYear: Joi.number(),
      schoolName: Joi.string()
    }
  },

  // POST /v1/auth/login
  login: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required().max(128)
    }
  },

  // POST /v1/auth/facebook
  // POST /v1/auth/google
  oAuth: {
    body: {
      access_token: Joi.string().required()
    }
  },

  // POST /v1/auth/refresh
  refresh: {
    body: {
      email: Joi.string().email().required(),
      refreshToken: Joi.string().required()
    }
  }
};