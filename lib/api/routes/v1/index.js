'use strict';

var _classType = require('../../services/classTypes/classType.route');

var _classType2 = _interopRequireDefault(_classType);

var _school = require('../../services/schools/school.route');

var _school2 = _interopRequireDefault(_school);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var userRoutes = require('../../services/user/user.route');
var authRoutes = require('../../services/auth/auth.route');

var router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', function (req, res) {
  return res.send('OK');
});

/**
 * GET v1/docs
 */

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/classTypes', _classType2.default);
router.use('/schools', _school2.default);

module.exports = router;