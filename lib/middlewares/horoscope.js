'use strict';

const utils = require('../utils');
const Data = require('../data');
// var _ = utils._;

module.exports = function (req, res, next) {
	const config = res.locals.config;
	const country = res.locals.currentCulture.country;
	const language = res.locals.currentCulture.language;
	const currentDate = res.locals.currentDate;
	const viewdata = res.viewdata;

	res.locals.location = [{
		href: res.locals.links.horoscope.home({
			ul: language
		}),
		text: res.locals.__('home')
	}];

	utils.maxage(res, 60 * 4);

	viewdata.latestStories = ['latestStories', { country: country, lang: language, limit: 4 }];

	viewdata.capitalCity = ['placeCurrentForecast', { placeId: config.capitalId }];
	if (config.projects.exchange) {
		const date = utils.formatDate(currentDate.toDate());
		const rateKeys = [];

		for (var i = 0; i < 2; i++) {
			rateKeys.push([country, date, config.exchange.currencies[i], config.exchange.source].join('').toUpperCase());
		}

		viewdata.mainExchangeRates = ['mainExchangeRates', { keys: rateKeys }];
		viewdata.mainExchangeSource = ['exchangeSource', { country: country, sourceId: config.exchange.source }];
	}

	next();
};
