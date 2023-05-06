const createError = require('http-errors');
const express = require('express');

const config = require('./config/config');
const indexRouter = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', indexRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res) => {
    const status = err.statusCode || 500;
    const message = err.statusMessage || err;

    res.status(status).json({ message });
});

app.set('port', config.port);

module.exports = app;