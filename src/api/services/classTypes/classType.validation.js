const Joi = require('joi');

module.exports = {

  // POST /v1/classTypes/getClassTypes
  getClassTypes: {
    body: {
      schoolName: Joi.string(),
      coords: Joi.array().items(Joi.number()),
      skillCategoryIds: Joi.array().items(Joi.string()),
      skillSubjectIds: Joi.array().items(Joi.string()),
      experienceLevel: Joi.string(),
      gender: Joi.string(),
      age: Joi.number(),
      locationName: Joi.string(),
    },
  },
};
