'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const basicAuth = require('./middleware/basic');
const { Users } = require('./models/index');

router.post('/signup', async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 5);
        const record = await Users.create(req.body);
        res.status(200).json(record);
    } catch (error) {
        res.status(403).send('Cannot Create User');
    }
});

router.post('/signin', basicAuth, (req, res, next) => {
    try{
        res.status(200).send(req.user);
    } catch (error) {
        res.status(401).send('You are NOT authorized');
    }
});

module.exports = router;