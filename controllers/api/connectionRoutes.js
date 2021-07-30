const router = require('express').Router();
const Connection = require('./models/Connections.js');

//==== find user connections ====//
router.get('/', async (req, res) => {
  let { user_id } = req.body;
  try {
    const userCons = await Connection.findAll({
      //where user is user ot target
      where: { user_id: user_id },
    });
    const targetCons = await Connection.findAll({
      //where user is user ot target
      where: { target_id: user_id },
    });
    res.status(200).json(userCons, targetCons);
  } catch (error) {
    res.status(500).json({ message: 'Error getting connections' });
  }
});

//==== user connects with somebody else ====//
router.post('/make_connection', async (req, res) => {
  let { user_id, target_id } = req.body;
  try {
    const connections = await Connection.create({
      user_id: user_id,
      target_id: target_id,
    });
    res.status(200).json(connections);
  } catch (error) {
    res.status(500).json(error);
  }
});

//==== target user accepts the connection ====//
router.put('/make_connection', async (req, res) => {
  let { id, user_id } = req.body;
  try {
    let findConnection = await Connection.findByPk({
      where: { id: id, target_id: user_id },
    });
    let connection = await findConnection.update({
      accepted: true,
    });
    res.status(200).json(connection);
  } catch (error) {
    res.status(500).json(error);
  }
});

//==== delete user connections ====//
router.delete('/', async (req, res) => {
  let { user_id } = req.body;
  try {
    let userCons = await Connection.findAll({ where: { user_id: user_id } });
    let userTargets = await Connection.findAll({
      where: { target_id: user_id },
    });
    let deleteCons = await userCons.destroy();
    let deleteTargets = await userTargets.destroy();
    res.status(200).json(deleteCons, deleteTargets);
  } catch (error) {
    res.status(500).json(error);
  }
});

//====  rejecting a connection request ====//
router.delete('/:connection_id', (req, res) => {
  const { connection_id } = req.params;
  try {
    const connections = await Connection.destroy({
      where: { id: connection_id },
    });
    res.status(200).json(connections);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
