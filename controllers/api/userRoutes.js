const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');
const { Op } = require('sequelize');

//===== signup =====//
//body = username, password
router.post('/signup', async (req, res) => {
  const testIP = '123.123.1.1';
  try {
    const userData = await User.create({ ...req.body, ip: testIP });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//===== login =====//
////TODO: backcheck relogin/bcrypt logic- works after signup, not after logout
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userData = await User.findOne({ where: { username: username } });
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(password);
    console.log(validPassword);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // const updateIp = await userData.update({ ip: req.ip });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res
        .status(200)
        .json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//===== logout =====//
router.post('/logout', (req, res) => {
  console.log('signing out');
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//==== search users, exclude password ====//
////ex. http://localhost:3001/api/users/search?user_instrument=1&user_genre=1
////ex. http://localhost:3001/api/users/search?id=1
//TODO: update for pagination- first 20
router.get('/search', async (req, res) => {
  if (req.query.id) {
    let { id } = req.query;
    try {
      const user = await User.findByPk(id, {
        attributes: { exclude: ['password'] },
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error getting user id' });
    }
  }
  if (req.query.user_instrument || req.query.user_genre) {
    let { user_instrument, user_genre } = req.query;
    try {
      const userData = await User.findAll({
        where: {
          [Op.or]: [
            { user_instrument: user_instrument || null },
            { user_genre: user_genre || null },
          ],
        },
        attributes: { exclude: ['password'] },
      });
      res.status(200).json(userData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  } else {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });

    if (!users) {
      res.status(500).json({ message: 'Error getting users' });
      return;
    }
    // res.json({ message: 'WE DID IT' });
    res.status(200).json(users);
  }
});

//==== update user info ====//
//TODO: add option to update password
router.put('/', withAuth, async (req, res) => {
  let { user_id } = req.session;
  let { username, user_instrument, user_genre, content, photo_str } = req.body;
  try {
    let findUser = await User.findByPk(user_id);
    let updateUser = findUser.update({
      username: username,
      user_instrument: user_instrument,
      user_genre: user_genre,
      content: content,
      photo_str: photo_str,
    });
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred in finding or setting the new info',
    });
  }
});

module.exports = router;
