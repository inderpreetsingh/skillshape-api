
const mongoose = require('mongoose');


/**
 * Class Type Schema
 * @private
 */
const classTypeSchema = new mongoose.Schema({
  createdBy: {
    type: String,
    optional: true,
  },
  schoolId: {
    type: String,
    optional: true,
  },
  name: {
    type: String,
    optional: true,
  },
  enrollmentIds: {
    type: [String],
    optional: true,
  },
  desc: {
    type: String,
    optional: true,
  },
  skillTypeId: {
    type: String,
    optional: true,
  },
  classTypeImg: {
    type: String,
    optional: true,
  },
  medium: {
    type: String,
    optional: true,
  },
  low: {
    type: String,
    optional: true,
  },
  classes: {
    type: [String],
    optional: true,
  },
  gender: {
    type: String,
    optional: true,
  },
  ageMin: {
    type: Number,
    optional: true,
  },
  ageMax: {
    type: Number,
    optional: true,
  },
  experienceLevel: {
    type: String,
    optional: true,
  },
  skillCategoryId: {
    type: [String],
    optional: true,
  },
  skillSubject: {
    type: [String],
    optional: true,
  },
  locationId: {
    type: String,
    optional: true,
  },
  isPublish: {
    type: Boolean,
    optional: true,
  },
  filters: {
    type: Object,
    optional: true,
  },
  'filters.classPriceCost': {
    type: Number,
    optional: true,
    decimal: true,
    blackbox: true,
  },
  'filters.monthlyPriceCost': {
    type: Object,
    optional: true,
    blackbox: true,
  },
  'filters.location': {
    type: Array,
    optional: true,
  },
  'filters.location.$': {
    type: Object,
    optional: true,
  },
  'filters.location.$.loc': {
    type: Object,
    optional: true,
    index: '2dsphere',
  },
  'filters.location.$.loc.type': {
    type: String,
    optional: true,
  },
  'filters.location.$.loc.coordinates': {
    type: [Number],
    optional: true,
    decimal: true,
  },
  'filters.location.$.loc.title': {
    type: String,
    optional: true,
  },
  'filters.location.$.loc.locationId': {
    type: String,
    optional: true,
  },
  'filters.location.$.loc.classTimeId': {
    type: String,
    optional: true,
  },
  'filters.schoolName': {
    type: String,
    optional: true,
  },
  createdAt: {
    type: Date,
    optional: true,
  },
});


/**
 * @typedef ClassType
 */
module.exports = mongoose.model('ClassType', classTypeSchema, 'ClassType');
