'use strict';

const express = require('express');
const cors = require('cors');
const authRouter = require('./auth/router');
const notFound = require('./src/error-handler/404');
const errorHandler = require('./src/error-handler/500');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);
app.use(authRouter);
app.use('*', notFound);
app.use(errorHandler);

 const start = (port) => app.listen(port, () => console.log('dem servers do be runnin doe:', port));

 module.exports = {
    app,
    start,
 };