/* eslint-disable no-console */
const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const httpStatus = require('http-status');
const config = require('./config/config');
const routes = require('./routes/v1');

const start = function () {
    const app = express();

    // set security HTTP headers
    app.use(helmet());

    // parse json request body
    app.use(express.json({ limit: '50mb' }));

    // parse urlencoded request body
    app.use(express.urlencoded({ extended: true, limit: '50mb' }));

    // sanitize request data
    app.use(xss());
    app.use(mongoSanitize());

    // gzip compression
    app.use(compression());

    // enable cors
    app.use(cors());
    app.options('*', cors());

    app.use((req, res, next) => {
        // For example, a GET request to `/test` will print "GET /test"
        console.log(`${req.method} ${req.url}`);

        next();
    });

    return app;
};

const apiRoute = function (app) {
    app.use((_, res, next) => {
        next();
    });

    // v1 api routes
    app.use('/v1', routes);
};

module.exports = {
    start,
    apiRoute,
};