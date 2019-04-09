const express = require('express');
import validate from "express-validation";
import {getSchools} from "./school.validation";
import controller from './school.controller';
const router = express.Router();



router
  .route("/getSchools")
  /**
   * @api {post} v1/schools/getSchools Get Schools List
   * @apiDescription Get a list of Schools
   * @apiVersion 1.0.0
   * @apiName Get School List
   * @apiGroup Schools
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
   * @apiSuccess {Object[]}       result              List of School.
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   *
   */
  .post(validate(getSchools), controller.getSchools);


module.exports = router;
