'use strict';

const utils = require('../utils');
const Data = require('../data');
// var _ = utils._;

module.exports = function(req, res, next) {
	const config = res.locals.config;
	const country = res.locals.currentCulture.country;
	const language = res.locals.currentCulture.language;
	const currentDate = res.locals.currentDate;
	const currentDayPeriod = 'D' + currentDate.format('YYYYMMDD');
	const currentWeekPeriod = 'W' + currentDate.format('YYYYWW');
	const viewdata = res.viewdata;
	const weekStartDate = currentDate.clone().isoWeekday(1).locale(language);
	const weekEndDate = currentDate.clone().isoWeekday(7).locale(language);

	res.locals.weekStartDate = weekStartDate;
	res.locals.weekEndDate = weekEndDate;
	res.locals.currentDayPeriod = currentDayPeriod;
	res.locals.currentWeekPeriod = currentWeekPeriod;

	res.locals.currentDayPeriodText = currentDate.format(config.dayFormat);
	res.locals.currentWeekPeriodText = weekStartDate.format('D MMM') + ' - ' + weekEndDate.format('D MMMM YYYY');

	res.locals.location = [{
		href: res.locals.links.horoscope.home({
			ul: language
		}),
		text: res.locals.__('home')
	}];

	utils.maxage(res, 60 * 4);

	viewdata.latestStories = ['latestStories', { country: country, lang: language, limit: 4 }];

	res.viewdata.capitalCity = ['placeCurrentForecast', { placeId: config.capitalId }];
	if (config.projects.exchange) {
		const date = utils.formatDate(res.locals.currentDate.toDate());
		const rateKeys = [];

		for (var i = 0; i < 2; i++) {
			rateKeys.push([country, date, config.exchange.currencies[i], config.exchange.source].join('').toUpperCase());
		}

		res.viewdata.mainExchangeRates = ['mainExchangeRates', { keys: rateKeys }];
		res.viewdata.mainExchangeSource = ['exchangeSource', { country: country, sourceId: config.exchange.source }];
	}
	next();
};
