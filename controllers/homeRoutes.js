const router = require('express').Router();
// const Connection = require('mysql2/typings/mysql/lib/Connections');
const { User, Connections } = require('../models');
const withAuth = require('../utils/auth');

// router.get('/profile', async (req, res) => {
//   render('profile', { username: 'testing' });
// });

// Use withAuth middleware to prevent access to route
router.get('/profile', async (req, res) => {
  const id = req.session.user_id;

  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });

    const userCons = await Connections.findAll({
      //where user is user ot target
      where: { user_id: id },
    });
    const targetCons = await Connections.findAll({
      //where user is user ot target
      where: { target_id: id },
    });

    res.render('profile', {
      userInfo: userData.dataValues,
      userTargets: [targetCons[0].dataValues],
      userCons: [userCons[0].dataValues],
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
  }
});

// //base route
router.get('/', (req, res) => {
  res.render('login');
});

// //new user
// router.get('/', (req, res) => {
//   res.render('signup');
// });

module.exports = router;
