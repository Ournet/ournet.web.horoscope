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

route.get('/api/reports.json', function processDailyRequest(req, res) {
    const config = res.locals.config;
    const period = req.query.period || ('D' + parseInt(res.locals.currentDate.format('YYYYMMDD')));
    const lang = req.query.lang && req.query.lang.toLowerCase().trim() || res.locals.currentCulture.language;

    if (typeof period !== 'string' && !/^[WD]\d+$/.test(period)) {
        return sendData(res, null, { message: `Param 'period' is invalid. Example: D20171018` }, 400);
    }

    // const currentDate = parseInt(res.locals.currentDate.format('YYYYMMDD'));
    // date = date ? parseInt(date) : currentDate;
    // const datePeriod = 'D' + date;


    // if (date < currentDate - 1 || date > currentDate + 1) {
    //     return sendData(res, null, { message: `Param 'date' is invalid. We offer reports only for yesterday, today and tomorow` }, 400);
    // }

    let clientId = req.query.client;

    if (!clientId) {
        return sendData(res, null, { message: `Invalid 'client' query string value` }, 400);
    }
    clientId = clientId.trim();

    logger.warn(`clientId=${clientId}`, { clientId: clientId, period: period });

    const currentCulture = res.locals.currentCulture;
    // const language = currentCulture.language;

    res.viewdata.reports = ['horoscopeReports', { where: '{"lang":"' + lang + '","period":"' + period + '"}', order: 'sign', limit: 12 }];

    Data.get(res.viewdata).then(function (result) {
        const reports = result.reports;
        sendData(res, { period: period, reports: reports });
    }, error => {
        logger.error(error, { clientId: clientId, period: period });
        res.status(500);
        res.send({ error: { message: error.message } });
    });
});

route.get('/api/daily-reports.json', (req, res) => {
    if (req.query.date) {
        req.query.period = 'D' + req.query.date;
    }
    // delete req.query.date;
    res.redirect(301, '/api/reports.json?client=' + encodeURIComponent(req.query.client || '') + '&period=' + encodeURIComponent(req.query.period || ''));
});

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
