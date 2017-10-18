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

function processRequest(req, res) {
    const config = res.locals.config;

    if (req.params.date && !/^\d{8}$/.test(req.params.date)) {
        return sendData(res, null, { message: `Param 'date' is invalid. It must be a number (20171018)` }, 400);
    }

    const currentDate = parseInt(res.locals.currentDate.format('YYYYMMDD'));
    const date = req.params.date ? parseInt(req.params.date) : currentDate;
    const datePeriod = 'D' + date;


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
}

route.get('/api/reports.json', processRequest);
route.get('/api/reports-:date.json', processRequest);

route.get('/api', function (req, res) {
    const config = res.locals.config;
    const project = res.locals.project;
    const __ = res.locals.__;

    const variables = {
        project: config.domain.substr(0, 1).toUpperCase() + config.domain.substr(1),
        schema: config.protocol,
        host: config.host,
        currentDate: res.locals.currentDate.format('YYYYMMDD')
    };

    res.locals.title = res.locals.site.head.title = __('api_title');
    res.locals.site.head.title += ' - ' + variables.project;
    res.locals.subTitle = res.locals.site.head.description = replaceVariables(__('api_subtitle'), variables);
    res.locals.body = replaceVariables(__('api_body'), variables);
    res.locals.site.head.canonical = config.protocol + '//' + config.host + '/api';

    res.render('api.jade');
});

function replaceVariables(text, vars) {
    for (var prop in vars) {
        var val = vars[prop];
        text = text.replace(new RegExp('\\$\\{' + prop + '\\}', 'g'), val);
    }

    return text;
}
