const router = require('express').Router();
const { Connections } = require('../../models');

router.get('/', async (req, res) => {
  let { testParam } = req.query;
  try {
    const userCons = await Connections.findByPk(testParam);
    // const targetCons = await Connections.findAll({
    //   //where user is user ot target
    //   where: { target_id: user_id },
    // });
    res.status(200).json(userCons);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
