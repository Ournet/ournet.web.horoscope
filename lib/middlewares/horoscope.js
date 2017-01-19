'use strict';

const utils = require('../utils');
const Data = require('../data');
// var _ = utils._;

module.exports = function(req, res, next) {
	const config = res.locals.config;
	const country = res.locals.currentCulture.country;
	const language = res.locals.currentCulture.language;
	const currentDate = res.locals.currentDate;
	const currentPeriod = 'D' + currentDate.format('YYYYMMDD');
	const viewdata = res.viewdata;

	res.locals.currentPeriod = currentPeriod;

	res.locals.location = [{
		href: res.locals.links.horoscope.home({
			ul: language
		}),
		text: res.locals.__('home')
	}];

	utils.maxage(res, 60 * 4);

	viewdata.currentReports = ['horoscopeReports', { where: '{"lang":"' + language + '","period":"' + currentPeriod + '"}', order: 'sign', limit: 20 }];

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
