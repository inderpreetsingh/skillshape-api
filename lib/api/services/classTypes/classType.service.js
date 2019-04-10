'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _lodash = require('lodash');

var _classType = require('./classType.model');

var _classType2 = _interopRequireDefault(_classType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get class Type listing based on the filter
 * @public
 */

exports.getClassTypes = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(filter) {
    var schoolName, coords, skillCategoryIds, skillSubjectIds, experienceLevel, gender, age, locationName, payload, classTypeFilter, maxDistance, result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            schoolName = filter.schoolName, coords = filter.coords, skillCategoryIds = filter.skillCategoryIds, skillSubjectIds = filter.skillSubjectIds, experienceLevel = filter.experienceLevel, gender = filter.gender, age = filter.age, locationName = filter.locationName;
            payload = {};
            classTypeFilter = {};

            // Add SchoolName to classType Filter;

            if (schoolName) {
              classTypeFilter.$text = { $search: schoolName };
            }

            // Add Gender Filter for class type
            if (gender) {
              classTypeFilter.gender = gender;
            }

            // Add Age Filter for class type
            if (age) {
              classTypeFilter.ageMin = { $lte: age };
              classTypeFilter.ageMax = { $gte: age };
            }

            // Add experienceLevel Filter for class type
            if (experienceLevel) {
              classTypeFilter.experienceLevel = experienceLevel;
            }

            //  Add skillCategory Filter for class type;
            if (skillCategoryIds && !(0, _lodash.isEmpty)(skillCategoryIds)) {
              classTypeFilter.skillCategoryId = { $in: skillCategoryIds };
            }

            // Add SkillSubjects Filter for class type;
            if (skillSubjectIds && !(0, _lodash.isEmpty)(skillSubjectIds)) {
              classTypeFilter.skillSubject = { $in: skillSubjectIds };
            }

            // Add Location Name Filter for class type;
            if (locationName) {
              classTypeFilter.$text = { $search: locationName };
            }

            // Add Coords Filter for class type;
            if (coords) {
              maxDistance = 50;

              maxDistance /= 63;
              if ((0, _lodash.isArray)(coords)) {
                classTypeFilter['filters.location.loc'] = {
                  $geoWithin: { $center: [[coords[1], coords[0]], maxDistance] }
                };
              }
            }

            if ((0, _lodash.isEmpty)(classTypeFilter)) {
              _context.next = 17;
              break;
            }

            _context.next = 15;
            return _classType2.default.find(classTypeFilter);

          case 15:
            result = _context.sent;

            payload = { result: result };

          case 17:
            return _context.abrupt('return', payload);

          case 20:
            _context.prev = 20;
            _context.t0 = _context['catch'](0);
            throw _context.t0;

          case 23:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 20]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();