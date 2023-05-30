'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const basicAuth = require('./middleware/basic');
const { User } = require('./models/index');

router.post('/signup', async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 5);
        const record = await User.create(req.body);
        res.status(200).json(record);
    } catch (error) { 
        res.stauts(403).send('Error creating user');
    }
});

router.post('/signin', basicAuth, (req, res) => {
    try {
        res.status(200).send(req.user);
    } catch (error) {
        res.status(401).send('You are not authorized');
    }
});

module.exports = router;

