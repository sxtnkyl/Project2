const router = require('express').Router();
const User = require('../../models');
const withAuth = require('../../utils/auth');

//===== signup =====//
router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create(req.body);

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

//===== logout =====//
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//==== search users, exclude password ====//
//TODO: update for pagination- first 20
router.get('/search', async (req, res) => {
  if (req.body) {
    let { user_instrument, user_genre } = req.body;
    try {
      const userData = await User.findAll({
        where: {
          user_instrument: user_instrument,
          user_genre: user_genre,
        },
        attributes: { exclude: ['password'] },
      });
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });

    if (!users) {
      res.status(500).json({ message: 'Error getting users' });
      return;
    }

    res.send({ users: users });
  }
});

//==== get single user by id ====//
////used when opening a single connection- bulk searches map user data
router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ['password'] },
  });
  if (!user) {
    res.status(500).json({ message: 'Error getting user id' });
    return;
  }

  res.send(user);
});

//==== user filter ====//
//TODO: refactor this into bulk search
// router.get('/user', async (req, res) => {
//   const userInstrument = req.query.userInstrument;
//   const userGenre = req.query.userGenre;
//   const userContent = req.query.userContent;
//   const userPhoto = req.query.userPhoto;
//   const userConnections = req.query.connections;

//   const userData = await User.findAll({
//     where: {
//       user_instrument: userInstrument,
//       user_genre: userGenre,
//       content: userContent,
//       photo_str: userPhoto,
//       connectionsList: userConnections,
//     },
//   });
// });

//==== update user info ====//
//TODO: add option to update password
router.put('/', withAuth, async (req, res) => {
  let { id } = req.session;
  let { username, user_instrument, user_genre, content, photo_str } = req.body;
  try {
    let findUser = await User.findByPk({ where: { id: id } });
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
