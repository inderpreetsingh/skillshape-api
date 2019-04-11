import { isEmpty, isArray, uniq } from 'lodash';
import School from './school.model';
import ClassType from '../classTypes/classType.model';
/**
 * Get class Type listing based on the filter
 * @public
 */

exports.getSchool = async (filter) => {
  try {
    let payload = {};
    let {
      schoolName,
    } = filter;
    const {
      coords,
      skillCategoryIds,
      skillSubjectIds,
      experienceLevel,
      gender,
      age,
      locationName,
    } = filter;
    const schoolFilter = {};
    const classTypeFilter = { };

    // Add schoolName Filter if schoolName Available
    if (schoolName) {
      schoolName = schoolName.split(' ');
      const schoolNameRegEx = [];
      schoolName.map(str => schoolNameRegEx.push(new RegExp(`.*${str}.*`, 'i')));
      schoolFilter.name = { $in: schoolNameRegEx };
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
    if (skillCategoryIds && !isEmpty(skillCategoryIds)) {
      classTypeFilter.skillCategoryId = { $in: skillCategoryIds };
    }

    // Add SkillSubjects Filter for class type;
    if (skillSubjectIds && !isEmpty(skillSubjectIds)) {
      classTypeFilter.skillSubject = { $in: skillSubjectIds };
    }

    // Add Location Name Filter for class type;
    if (locationName) {
      classTypeFilter.$text = { $search: locationName };
    }

    // Add Coords Filter for class type;
    if (coords) {
      let maxDistance = 50;
      maxDistance /= 63;
      if (isArray(coords)) {
        classTypeFilter['filters.location.loc'] = {
          $geoWithin: { $center: [[coords[1], coords[0]], maxDistance] },
        };
      }
    }

    if (!isEmpty(classTypeFilter)) {
      const classTypeData = await ClassType.find(classTypeFilter);
      if (!isEmpty(classTypeData)) {
        let schoolIds = [];
        classTypeData.map((obj) => {
          if (obj.schoolId) schoolIds.push(obj.schoolId);
          return '';
        });
        schoolIds = uniq(schoolIds);
        if (!isEmpty(schoolIds)) {
          schoolFilter._id = { $in: schoolIds }; // eslint-disable-line no-underscore-dangle
        }
      }
    }
    let result = [];
    if (!isEmpty(schoolFilter)) {
      schoolFilter.isPublish = true;
      result = await School.find(schoolFilter);
    }
    payload = { result };
    return payload;
  } catch (error) {
    throw error;
  }
};

