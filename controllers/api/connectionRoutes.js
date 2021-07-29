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

  router.post('/api/connections/user_id/:target_id', async (req, res) => {
    const connections = await Connection.findAll({where: {user_id: req.params.id}});
  
    if (!connections) {
      res
        .status(500)
        .json({ message: 'Error getting connections target id' });
      return;
    }
    res.send(connections);
  });


//==== DELETE /API/Connections/:target_id - on rejection ====//
router.delete('api/connections/:target_id', (req, res) => {
    const { username } = req.params;
    db.collection('username').findOneAndDelete({username: username}, 
    (err, result) => {
    if (err) return res.send(500, err)
    console.log('got deleted');
    res.redirect('/');
    });
});

//==== DELETE /API/Connections/:user_id ====//