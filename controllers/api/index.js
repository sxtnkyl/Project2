const router = require('express').Router();
const userRoutes = require('./userRoutes');
const connectionRoutes = require('./connectionRoutes');
const testRoutes = require('./testRoutes');

router.use('/matches', testRoutes);
router.use('/users', userRoutes);
router.use('/connections', connectionRoutes);
// router.use('/projects', projectRoutes);

module.exports = router;
