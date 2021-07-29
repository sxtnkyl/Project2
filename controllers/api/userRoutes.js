const router = require('express').Router();
const { response } = require('express');
const User = require('../../models');

//===== login =====//
router.post('/user/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

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

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//==== user filter ====//
router.get('/api/user', async (req, res) => {
  const userInstrument = req.query.userInstrument;
  const userGenre = req.query.userGenre;
  const userContent = req.query.userContent;
  const userPhoto = req.query.userPhoto;
  const userConnections = req.query.connections;

  const userData = await User.findAll({
    where: {
      user_instrument: userInstrument,
      user_genre: userGenre,
      content: userContent,
      photo_str: userPhoto,
      connectionsList: userConnections,
    }
  });
});

//==== update user info ====//
router.put('/user/:id/:data', async (req, res) => {
  const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } })
  if (!user) {
    res
      .status(500)
      .json({ message: 'Error getting user id' });
    return;
  }

  const userInstrument = req.query.userInstrument;
  const userGenre = req.query.userGenre;
  const userContent = req.query.userContent;
  const userPhoto = req.query.userPhoto;

  const result = await user.update({
    user_instrument: userInstrument,
    user_genre: userGenre,
    content: userContent,
    photo_str: userPhoto,
  });

  //==== update succesfful if one row was effected else resturn 400 status ====//
  if (result[0] === 1) {
    res
      .status(201)
  } else {
    res
      .status(400)
      .json({ message: 'Error getting user id' });
    return;
  }
});


module.exports = router;
