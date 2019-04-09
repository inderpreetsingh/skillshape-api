const express = require('express');
import validate from "express-validation";
import {getClassTypes} from "./classType.validation";
import controller from './classType.controller';
const router = express.Router();



router
  .route("/getClassTypes")
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
  .post(validate(getClassTypes), controller.getClassTypes);


module.exports = router;
