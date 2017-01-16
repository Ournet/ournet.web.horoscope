'use strict';

const express = require('express');
const util = require('util');
const utils = require('../utils');
// const _ = utils._;
/*eslint new-cap:1*/
const route = module.exports = express.Router();
const Data = require('../data');

//index

route.get('/', function(req, res, next) {
	const config = res.locals.config;
	utils.maxageIndex(res);

	const currentCulture = res.locals.currentCulture;
	const links = res.locals.links;
	const __ = res.locals.__;

	res.locals.location.pop();

	// res.locals.title = res.locals.site.head.title = util.format(__('home_title_format'), Data.places.Place.inCountryName(currentCulture.countryName, currentCulture.language));
	// res.locals.subTitle = res.locals.site.head.description = util.format(__('weather_in_cn_summary'), Data.places.Place.inCountryName(currentCulture.countryName, currentCulture.language));
	// res.locals.site.head.keywords = util.format('%s, %s, %s', __('weather'), __('weather2'), currentCulture.countryName);

	res.locals.site.head.canonical = 'http://' + config.host + links.horoscope.home({
		ul: currentCulture.language
	});

	Data.get(res.viewdata).then(function(result) {
		// console.log(result);
		res.render('index', result);
	}, next);
});
