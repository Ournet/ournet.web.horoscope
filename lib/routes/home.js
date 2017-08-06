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

route.get('/', function (req, res, next) {
	const config = res.locals.config;
	utils.maxageIndex(res);

	const currentCulture = res.locals.currentCulture;
	const language = currentCulture.language;
	const links = res.locals.links;
	const __ = res.locals.__;
	// const currentDate = res.locals.currentDate;
	const currentDayPeriod = res.locals.currentDayPeriod;

	res.locals.periodSign = 'D';

	if (config.weeklyName) {
		res.locals.periods = [
			{ href: links.horoscope.home(), text: __('daily'), css: 'selected' },
			{ href: links.horoscope.sign(config.weeklyName), text: __('weekly') }
		];
	}

	res.locals.location.pop();

	res.locals.site.head.title = __('daily_horoscope');
	res.locals.site.head.description = __('daily_horoscope_details');

	res.locals.title = util.format(__('daily_horoscope_format'), res.locals.currentDayPeriodText);
	res.locals.subTitle = util.format(__('daily_horoscope_details_format'), res.locals.currentDayPeriodText);

	res.locals.site.head.canonical = config.protocol + '//' + config.host + links.horoscope.home({
		ul: currentCulture.language
	});

	res.viewdata.currentReports = ['horoscopeReports', { where: '{"lang":"' + language + '","period":"' + currentDayPeriod + '"}', order: 'sign', limit: 20 }];

	Data.get(res.viewdata).then(function (result) {
		// console.log(result);
		res.render('index', result);
	}, next);
});

route.get('/' + utils.WEEKLY_ROUTE, function (req, res, next) {
	const config = res.locals.config;
	utils.maxageIndex(res);

	const currentCulture = res.locals.currentCulture;
	const language = currentCulture.language;
	const links = res.locals.links;
	const __ = res.locals.__;
	// const currentDate = res.locals.currentDate;
	const currentWeekPeriod = res.locals.currentWeekPeriod;

	res.locals.periodSign = 'W';

	if (config.weeklyName) {
		res.locals.periods = [
			{ href: links.horoscope.home(), text: __('daily') },
			{ href: links.horoscope.sign(config.weeklyName), text: __('weekly'), css: 'selected' }
		];
	}

	res.locals.location.pop();

	res.locals.site.head.title = __('weekly_horoscope');
	res.locals.site.head.description = __('weekly_horoscope_details');

	res.locals.title = util.format(__('weekly_horoscope_format'), res.locals.currentWeekPeriodText);
	res.locals.subTitle = util.format(__('weekly_horoscope_details_format'), res.locals.currentWeekPeriodText);

	res.locals.site.head.canonical = config.protocol + '//' + config.host + links.horoscope.sign(config.weeklyName);

	res.viewdata.currentReports = ['horoscopeReports', { where: '{"lang":"' + language + '","period":"' + currentWeekPeriod + '"}', order: 'sign', limit: 20 }];

	Data.get(res.viewdata).then(function (result) {
		// console.log(result);
		res.render('index', result);
	}, next);
});

function routeSignSlug(req, res, next) {
	const config = res.locals.config;
	const culture = res.locals.currentCulture;
	const currentDayPeriod = res.locals.currentDayPeriod;
	const reportDatePeriod = req.params.date && ('D' + utils.moment(req.params.date))

	utils.maxageReport(res);

	const sign = Data.signNameBySlug(culture.language, req.params.signSlug);
	const links = res.locals.links;
	const __ = res.locals.__;
	// const currentDate = res.locals.currentDate;


	if (!sign) {
		return res.redirect(301, links.horoscope.home());
	}

	res.locals.periodSign = 'D';

	if (config.weeklyName) {
		res.locals.periods = [
			{ href: links.horoscope.sign(sign.slug), text: __('daily'), css: 'selected' },
			{ href: links.horoscope.sign.period(sign.slug, config.weeklyName), text: __('weekly') }
		];
	}

	const todayReportId = currentDayPeriod + culture.language.toUpperCase() + sign.id;

	res.viewdata.currentSignReport = ['horoscopeReport', { id: todayReportId }];

	res.locals.location.pop();

	res.locals.site.head.title =
		res.locals.title = util.format(__('sign_daily_title_format'), sign.name);

	res.locals.site.head.description =
		res.locals.subTitle = util.format(__('sign_daily_details_format'), sign.name, res.locals.currentDayPeriodText);

	res.locals.site.head.canonical = config.protocol + '//' + config.host + links.horoscope.sign(sign.slug);

	Data.get(res.viewdata).then(function (result) {
		// console.log(result);
		result.sign = sign;
		res.render('sign', result);
	}, next);
}

route.get('/:signSlug(\\w+)', routeSignSlug);
route.get('/:signSlug(\\w+)/:date(\\d{2}-d{2}-{d4})', routeSignSlug);

route.get('/:signSlug(\\w+)/' + utils.WEEKLY_ROUTE, function (req, res, next) {
	const config = res.locals.config;
	const culture = res.locals.currentCulture;

	utils.maxageReport(res);

	const sign = Data.signNameBySlug(culture.language, req.params.signSlug);
	const links = res.locals.links;
	const __ = res.locals.__;
	// const currentDate = res.locals.currentDate;
	const currentWeekPeriod = res.locals.currentWeekPeriod;

	if (!sign) {
		return res.redirect(301, links.horoscope.home());
	}

	res.locals.periodSign = 'W';

	if (config.weeklyName) {
		res.locals.periods = [
			{ href: links.horoscope.sign(sign.slug), text: __('daily') },
			{ href: links.horoscope.sign.period(sign.slug, config.weeklyName), text: __('weekly'), css: 'selected' }
		];
	}

	const todayReportId = currentWeekPeriod + culture.language.toUpperCase() + sign.id;

	res.viewdata.currentSignReport = ['horoscopeReport', { id: todayReportId }];

	res.locals.location.pop();

	res.locals.site.head.title =
		res.locals.title = util.format(__('sign_weekly_title_format'), sign.name);

	res.locals.site.head.description =
		res.locals.subTitle = util.format(__('sign_weekly_details_format'), sign.name, res.locals.currentWeekPeriodText);

	res.locals.site.head.canonical = config.protocol + '//' + config.host + links.horoscope.sign.period(sign.slug, config.weeklyName);

	Data.get(res.viewdata).then(function (result) {
		// console.log(result.currentSignReport);
		result.sign = sign;
		res.render('sign', result);
	}, next);
});

route.get('/manifest.json', function (req, res, next) {
	const config = res.locals.config;

	const manifest = {
		name: config.name,
		short_name: config.short_name,
		// start_url: '/',
		display: 'standalone',
		gcm_sender_id: '482941778795'
	};

	utils.maxageStatic(res);

	res.send(manifest);
});

route.all('/private/log', function logData(req, res, next) {
	logger.warn(req.originalUrl);
	logger.warn('post data', req.body);
	res.send('success');
});
