'use strict';

const express = require('express');
const utils = require('../utils');
/*eslint new-cap:1*/
const route = module.exports = express.Router();
const url = require('url');
const logger = require('../logger');

route.get('/favicon.ico', function(req, res) {
	const config = res.locals.config;
	utils.maxage(res, 60 * 24 * 14);
	return res.redirect(301, config.getFavicon());
});

route.get('/apple-touch-icon.png', function(req, res) {
	const config = res.locals.config;
	utils.maxage(res, 60 * 24 * 14);
	return res.redirect(301, config.getAppleFavicon());
});
