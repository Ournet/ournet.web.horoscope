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
	const currentDate = res.locals.currentDate;

	res.locals.location.pop();

	res.locals.site.head.title = __('home_title');
	res.locals.site.head.description = __('home_description');

	res.locals.title = util.format(__('horoscope_title_format'), currentDate.format(config.dateFormat));
	res.locals.subTitle = util.format(__('horoscope_for_today_details'), currentDate.format(config.dayFormat));

	res.locals.site.head.canonical = 'http://' + config.host + links.horoscope.home({
		ul: currentCulture.language
	});

	Data.get(res.viewdata).then(function(result) {
		// console.log(result);
		res.render('index', result);
	}, next);
});
