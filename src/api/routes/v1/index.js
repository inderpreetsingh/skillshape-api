import classTypeRoutes from '../../services/classTypes/classType.route';
import schoolRoutes from '../../services/schools/school.route';

const express = require('express');
const userRoutes = require('../../services/user/user.route');
const authRoutes = require('../../services/auth/auth.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/classTypes', classTypeRoutes);
router.use('/schools', schoolRoutes);

module.exports = router;
