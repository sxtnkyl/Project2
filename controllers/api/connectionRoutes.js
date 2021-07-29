const router = require('express').Router();
const User  = require('../../models');
const Connection = require('./models/Connections.js');
const Genre = require('../models/Genre');
const Instrument = require('../models/Instrument');

//==== find user connections ====//
router.get('/api/connections/user/:id', async (req, res) => {
    const connections = await Connection.findAll({where: {user_id: req.params.id}});
  
    if (!connections) {
      res
        .status(500)
        .json({ message: 'Error getting connections' });
      return;
    }
  
    res.send(connections);
  });


  //==== Post user connections ====//
  //POST /API/Connection/user_id&:target_id