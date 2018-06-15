'use strict';

const express = require('express');
const util = require('util');
const utils = require('../utils');
// const _ = utils._;
/*eslint new-cap:1*/
const route = module.exports = express.Router();
const Data = require('../data');
const logger = require('../logger');
const Widget1 = require('../data/widgets/widget1');

//index

route.get('/widgets', function (req, res, next) {
    var config = res.locals.config;
    var __ = res.locals.__,
        currentCulture = res.locals.currentCulture,
        links = res.locals.links;

    res.locals.site.pageLayoutCss = 'form-layout';
    res.locals.site.head.title = util.format('%s - %s', __('horoscope_on_your_site'), config.name);
    res.locals.site.head.description = __('horoscope_on_your_site_info');

    // res.locals.site.head.canonical = utils.canonical(currentCulture.country, links.horoscope.widgets({
    // 	ul: currentCulture.language
    // }));

    const viewdata = res.viewdata;

    Data.get(viewdata)
        .then(function (result) {
            res.render('widgets/index', result);
        }, next);

});

route.get('/widgets/widget1_script', function (req, res, next) {
    const config = res.locals.config;
    utils.maxageIndex(res);

    const currentCulture = res.locals.currentCulture;
    const language = currentCulture.language;
    const project = {
        name: config.name,
        host: config.host,
        schema: config.schema,
    };

    const widget = Widget1.createFromQuery(project, language, req.query);

    res.send(widget.toHtmlScript());
});

route.get('/widgets/widget1_frame', function (req, res, next) {

    utils.maxage(res, 60);

    const config = res.locals.config;
    const lang = res.locals.currentCulture.language;

    const widget = Widget1.createFromQuery(config, lang, req.query);

    const currentDayPeriod = res.locals.currentDayPeriod;

    res.viewdata.reports = ['horoscopeReports', { where: '{"lang":"' + lang + '","period":"' + currentDayPeriod + '"}', order: 'sign', limit: 20 }];

    Data.get(res.viewdata).then(function (result) {
        result.widget = widget;
        res.render('widgets/widget1-frame', result);
    }, next);
});

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