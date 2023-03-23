const express = require('express');

const config = require('./config/config');
const indexRouter = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);

app.set('port', config.port);

module.exports = app;