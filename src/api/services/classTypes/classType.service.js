import ClassType from './classType.model';
import {isEmpty,isArray} from "lodash";
/**
 * Get class Type listing based on the filter
 * @public
 */

exports.getClassTypes = async (filter) => {
  try {
    let {
      schoolName,
      coords,
      skillCategoryIds,
      skillSubjectIds,
      experienceLevel,
      gender,
      age,
      locationName
    } = filter;
    let payload = {};
    let classTypeFilter = {};

    // Add SchoolName to classType Filter;
    if (schoolName) {
      classTypeFilter["$text"] = { $search: schoolName };
    }

    // Add Gender Filter for class type
    if (gender) {
      classTypeFilter["gender"] = gender;
    }

    // Add Age Filter for class type
    if (age) {
      classTypeFilter["ageMin"] = { $lte: age };
      classTypeFilter["ageMax"] = { $gte: age };
    }

    // Add experienceLevel Filter for class type
    if (experienceLevel) {
      classTypeFilter["experienceLevel"] = experienceLevel;
    }

    //  Add skillCategory Filter for class type;
    if (skillCategoryIds && !isEmpty(skillCategoryIds)) {
      classTypeFilter["skillCategoryId"] = { $in: skillCategoryIds };
    }

    // Add SkillSubjects Filter for class type;
    if (skillSubjectIds && !isEmpty(skillSubjectIds)) {
      classTypeFilter["skillSubject"] = { $in: skillSubjectIds };
    }

    // Add Location Name Filter for class type;
    if (locationName) {
      classTypeFilter["$text"] = { $search: locationName };
    }

    // Add Coords Filter for class type;
    if (coords) {
      let maxDistance = 50;
      maxDistance /= 63;
      if (isArray(coords)) {
        classTypeFilter["filters.location.loc"] = {
          $geoWithin: { $center: [[coords[1], coords[0]], maxDistance] }
        };
      }
    }
    
    if (!isEmpty(classTypeFilter)) {
      let result = await ClassType.find(classTypeFilter);
      payload = { result };
    }
    return payload
  } catch (error) {
    throw error;
  }
};

