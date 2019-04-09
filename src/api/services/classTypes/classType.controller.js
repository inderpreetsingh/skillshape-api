import service from './classType.service';


const { handler: errorHandler } = require('../../middlewares/error');

/**
 * Get Class Type Listing Based on filter.
 * @public
 */
exports.getClassTypes = async (req, res, next) => {
  try {
    const data = await service.getClassTypes(req.body);
    res.json(data);
    return next();
  } catch (error) {
    console.log('TCL: exports.getClassTypes -> error', error);
    return errorHandler(error, req, res);
  }
};

