const router = require('express').Router();
// const Connection = require('mysql2/typings/mysql/lib/Connections');
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  res.redirect('/profile');


  res.render('login');
});
router.get('/', ( req, res) => {
  res.render('login')
});
router.get('/signup', ( req, res) => {
  res.render('signup')
});
module.exports = router;
