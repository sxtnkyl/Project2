const router = require('express').Router();
const { Sequelize } = require('sequelize');
const { Connections, User } = require('../../models');

//get a connection by id
router.get('/', async (req, res) => {
  let { id } = req.query;
  try {
    const userCons = await Connections.findAll({
      //where user is user ot target
      where: { user_id: id },
    });
    const targetCons = await Connections.findAll({
      //where user is user ot target
      where: { target_id: id },
    });
    res.status(200).json({ userCons: userCons, targetCons: targetCons });
  } catch (error) {
    res.status(500).json({ message: 'Error getting connections', error });
  }
});

//get a user's connections by id
router.get('/getConnections', async (req, res) => {
  let { id } = req.query;
  try {
    const userData = await User.findByPk(id, {
      attributes: ['connectionsList'],
    });
    res.status(200).json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//==== user connects with somebody else ====//
router.post('/make_connection', async (req, res) => {
  let { user_id, target_id } = req.body;
  try {
    //make connection
    const connections = await Connections.create({
      user_id: user_id,
      target_id: target_id,
    });
    //update user, need connections to update
    const updateUser = await User.update(
      {
        connectionsList: Sequelize.fn(
          'CONCAT',
          Sequelize.col('connections_list'),
          ';' + connections.id.toString()
        ),
      },
      { where: { id: user_id } }
    );
    //update target
    const updateTarget = await User.update(
      {
        connectionsList: Sequelize.fn(
          'CONCAT',
          Sequelize.col('connections_list'),
          ';' + connections.id.toString()
        ),
      },
      { where: { id: target_id } }
    );
    res.status(200).json(connections);
  } catch (error) {
    res.status(500).json(error);
  }
});

//resolve connection by id
router.put('/resolve', async (req, res) => {
  let { id } = req.query;
  try {
    const con = await Connections.update(
      { accepted: true },
      {
        where: { id: id },
      }
    );
    res.status(200).json(con);
  } catch (error) {
    res.status(500).json({ message: 'Error getting connections', error });
  }
});

module.exports = router;
