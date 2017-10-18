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

route.get('/widgets/tab-v1', function (req, res, next) {
    const config = res.locals.config;
    utils.maxageIndex(res);

    const currentCulture = res.locals.currentCulture;
    const language = currentCulture.language;
    const links = res.locals.links;
    const __ = res.locals.__;
    const currentDate = res.locals.currentDate;
    const currentDayPeriod = 'D' + currentDate.format('YYYYMMDD');

    res.locals.site.head.canonical = config.protocol + '//' + config.host + links.horoscope.home({
        ul: currentCulture.language
    });

    res.viewdata.reports = ['horoscopeReports', { where: '{"lang":"' + language + '","period":"' + currentDayPeriod + '"}', order: 'sign', limit: 20 }];

    Data.get(res.viewdata).then(function (result) {
        res.locals.signs = result.reports.map(item => {
            return {
                id: item.sign,
                summary: item.text,
                name: res.locals.util.signName(item.sign, language)
            };
        });
        res.render('widgets/tab-v1');
    }, next);
});