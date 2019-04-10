import service from './school.service';

const { handler: errorHandler } = require('../../middlewares/error');

/**
 * Get Class Type Listing Based on filter.
 * @public
 */
exports.getSchools = async (req, res, next) => {
  try {
    const data = await service.getSchool(req.body);
    res.json(data);
    return next();
  } catch (error) {
    console.log('TCL: exports.getSchools -> error', error);
    return errorHandler(error, req, res);
  }
};

