const router = require('express').Router();
const { Connections } = require('../../models');

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

module.exports = router;
