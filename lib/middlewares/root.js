'use strict';

const _package = require('../../package.json');
const utils = require('../utils');
const Data = require('../data');
const Links = require('ournet.links');
const helpers = require('../helpers');

const util = {
	moment: utils.moment,
	format: require('util').format,
	startWithUpperCase: utils.startWithUpperCase,
	numberFormat: utils.number.format,
	weather: {
		symbolName: function (symbol, lang) {
			return Data.weather.symbolName(symbol, lang);
		},
		windDirectionCss: utils.windDirectionCss,
		pressureTommHg: utils.pressureTommHg
	},
	Place: Data.places.Place,
	encodeReportText: function (text) {
		return text.split(/\n/g).map(line => {
			return '<p>' + utils.encodeHTML(line) + '</p>';
		}).join('');
	},
	signName: Data.signName,
	horoscopeSignDates: helpers.horoscopeSignDates,
	formatSignDates: helpers.formatSignDates,
};

module.exports = function (req, res, next) {
	const config = res.locals.config;

	res.locals.Links = Links;

	res.viewdata = {};

	const culture = res.locals.currentCulture = {
		language: res.locale,
		country: config.country
	};

	util.localDate = function (t) {
		t = t || Date.now();
		return utils.moment.tz(t, config.timezone).locale(culture.language);
	};

	res.locals.noGoogleAds = false;
	res.locals.currentDate = util.localDate();

	const country = culture.country;
	const language = culture.language;
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

	res.locals.site = {
		name: config.name,
		head: {},
		platform: utils.getPlatform(req),
		simpleLocale: culture.language + '_' + culture.country.toUpperCase()
	};

	res.locals.config = config;

	res.locals.project = {
		version: _package.version,
		name: 'horoscope',
		portalsAbroad: []
	};

	res.locals.util = util;

	res.locals._events = [];

	next();
};
