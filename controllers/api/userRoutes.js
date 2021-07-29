const router = require('express').Router();
const { User } = require('../../models');
const Connection = require('./models/Connections.js');
const Genre = require('../models/Genre');
const Instrument = require('../models/Instrument');



//==== returning all users with user info except password ====//
router.get('/api/user', async (req, res) => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  if (!users) {
    res
      .status(500)
      .json({ message: 'Error getting users' });
    return;
  }

  res.send({ users: users });
});

//==== returning users by id ====//
router.get('/user/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } })
  if (!user) {
    res
      .status(500)
      .json({ message: 'Error getting user id' });
    return;
  }

  res.send(user);
});

//==== filter userData ====//
router.get('/api/connections', async (req, res) => {
  const userData = await User.findAll(req.body, { attributes: { exclude: ['password'] } })

  if (!userData) {
    res
      .status(500)
      .json({ message: 'Error getting user data' });
    return;
  }

  res.send(userData);
});

//==== GET /API/Connections/:user_id -user_id = target_id ====//






router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
