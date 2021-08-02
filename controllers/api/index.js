const router = require('express').Router();
const userRoutes = require('./userRoutes');
const matchesRoutes = require('./matchesRoutes');
const projectRoutes = require('./searchRoutes');

router.use('/matches', matchesRoutes);
router.use('/users', userRoutes);
// router.use('/projects', projectRoutes);

module.exports = router;
