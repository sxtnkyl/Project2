const router = require('express').Router();
const User  = require('../../models');
const Connection = require('./models/Connections.js');
const Genre = require('../models/Genre');
const Instrument = require('../models/Instrument');

//==== filter userData ====//
router.get('/api/connections', async (req, res) => {
    const userData = await Connection.findAll(req.body, { attributes: { exclude: ['password'] } })
  
    if (!userData) {
      res
        .status(500)
        .json({ message: 'Error getting user data' });
      return;
    }
  
    res.send(userData);
  });