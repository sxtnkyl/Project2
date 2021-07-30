const router = require('express').Router();
const { Connections, Genre } = require('../../models/Connections');

//==== find user connections ====//
router.get('/test', async (req, res) => {
  let { user_id } = req.query;
  console.log(user_id);
  try {
    // const con = await Connections.findByPk(user_id);
    const con = await Connections.findOne({ where: { id: 1 } });
    // const userCons = await Connections.findAll({
    //   //where user is user ot target
    //   where: { user_id: user_id },
    // });
    // const targetCons = await Connections.findAll({
    //   //where user is user ot target
    //   where: { target_id: user_id },
    // });
    // res.status(200).json({ usercons: userCons, targetcons: targetCons });
    res.json(con);
  } catch (error) {
    res.status(500).json({ message: 'Error getting connections', error });
  }
});

//==== user connects with somebody else ====//
router.post('/make_connection', async (req, res) => {
  let { user_id, target_id } = req.body;
  try {
    const connections = await Connections.create({
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
    let findConnection = await Connections.findByPk({
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
    let userCons = await Connections.findAll({ where: { user_id: user_id } });
    let userTargets = await Connections.findAll({
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
router.delete('/:connection_id', async (req, res) => {
  const { connection_id } = req.params;
  try {
    const connections = await Connections.destroy({
      where: { id: connection_id },
    });
    res.status(200).json(connections);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
