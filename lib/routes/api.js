'use strict';

const express = require('express');
const util = require('util');
const utils = require('../utils');
// const _ = utils._;
/*eslint new-cap:1*/
const route = module.exports = express.Router();
const Data = require('../data');
const logger = require('../logger');

//index

function sendData(res, data, error, statusCode) {
    utils.maxage(res, 60);
    if (error) {
        statusCode = statusCode || error.statusCode || 500;
        if (statusCode >= 500) {
            utils.maxage(res, 5);
        }
        logger.error(error, { statusCode: statusCode });
        res.status(statusCode);
        return res.send({ error: { message: error.message } });
    }
    res.send({ data: data });
}

route.get('/api/reports-:date(\\d{8}).json', function (req, res, next) {
    const config = res.locals.config;
    const date = parseInt(req.params.date);
    const datePeriod = 'D' + date;
    const currentDate = parseInt(res.locals.currentDate.format('YYYYMMDD'));

    if (date < currentDate - 1 || date > currentDate + 1) {
        return sendData(res, null, { message: `Param 'date' is invalid. We offer reports only for yesterday, today and tomorow` }, 400);
    }

    let clientId = req.query.client;

    if (!clientId) {
        return sendData(res, null, { message: `Invalid 'client' query string value` }, 400);
    }
    clientId = clientId.trim();

    logger.warn(`clientId=${clientId}`, { clientId: clientId, date: date });

    const currentCulture = res.locals.currentCulture;
    const language = currentCulture.language;

    res.viewdata.reports = ['horoscopeReports', { where: '{"lang":"' + language + '","period":"' + datePeriod + '"}', order: 'sign', limit: 12 }];

    Data.get(res.viewdata).then(function (result) {
        const reports = result.reports;
        sendData(res, { date: date, reports: reports });
    }, error => {
        logger.error(error, { clientId: clientId, date: date });
        res.status(500);
        res.send({ error: { message: error.message } });
    });
});