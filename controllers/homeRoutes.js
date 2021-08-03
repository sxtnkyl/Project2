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

    const otherUsers = await User.findAll({
      attributes: { exclude: ['password'] },
    });

    let mapped = [];
    for (let key in otherUsers) {
      mapped.push(otherUsers[key].dataValues);
    }
    console.log(mapped);

    const profileData = {
      userInfo: userData.dataValues,
      userTargets: targetCons.length ? [targetCons[0].dataValues] : [],
      userCons: userCons.length ? [userCons[0].dataValues] : [],
      sess: req.session,
      others: mapped,
    };

    res.render('profile', profileData);
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
  console.log(req.session);
  if (req.session.user_id) {
    res.redirect('/profile');
  } else res.render('login');
});

// //new user
// router.get('/', (req, res) => {
//   res.render('signup');
// });

module.exports = router;
