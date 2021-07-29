const router = require('express').Router();
const User = require('../../models');
const Connection = require('./models/Connections.js');
const Genre = require('../models/Genre');
const Instrument = require('../models/Instrument');

//==== find user connections ====//
router.get('/api/connections/user/:id', async (req, res) => {
    const connections = await Connection.findAll({ where: { user_id: req.params.id } });

    if (!connections) {
        res
            .status(500)
            .json({ message: 'Error getting connections' });
        return;
    }

    res.send(connections);
});


//==== post user connections ====//
router.post('/api/connections/make_connection/', async (req, res) => {
    let { userID, targetID } = request.body
    try {
        const connections = await Connection.create({ user_id: userID, target_id: targetID });
        res.status(200).json(connections);
    } catch (error) {
        res.status(500).json(error);
    }
});


//==== delete user connections ====//
router.delete('api/connections/', async (req, res) => {
    let { user_id } = req.body;
    try {
        const connections = await Connection.destroy({ where: { user_id: user_id } });
        const connections_targetid = await Connection.destroy({ where: { target_id: user_id } });
        res.status(200).json(connections, connections_targetid);
    } catch (error) {
        res.status(500).json(error);
    }
});

//====  rejecting a connection request ====//
router.delete('api/connections/:connection_id', (req, res) => {
    const { connection_id } = req.params;
    try {
        const connections = await Connection.destroy({ where: { id: connection_id } });
        res.status(200).json(connections);
    } catch (error) {
        res.status(500).json(error);
    }
});