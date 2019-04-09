"use strict";

var _expressValidation = require("express-validation");

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _classType = require("./classType.validation");

var _classType2 = require("./classType.controller");

var _classType3 = _interopRequireDefault(_classType2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');

var router = express.Router();

router.route("/getClassTypes")
/**
 * @api {post} v1/classTypes/getClassTypes Get Class Types
 * @apiDescription Get a list of class types
 * @apiVersion 1.0.0
 * @apiName Get Class Types
 * @apiGroup classTypes
 * @apiPermission Public
 *
 * @apiParam  {String}          [schoolName]        Name of the School
 * @apiParam  {[Number]}        [coords]            Coordinates of the class type location
 * @apiParam  {[String]}        [skillCategoryIds]  Skill category ids
 * @apiParam  {[String]}        [skillSubjectIds]   Skill subject ids
 * @apiParam  {String}          [experienceLevel]   experience required in class type
 * @apiParam  {String}          [gender]            Gender of users in class type
 * @apiParam  {Number}          [age]               User's age in class
 * @apiParam  {String}          [locationName]      Class type location
 *
 * @apiSuccess {Object[]}       result              List of class Types.
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 *
 */
.post((0, _expressValidation2.default)(_classType.getClassTypes), _classType3.default.getClassTypes);

module.exports = router;