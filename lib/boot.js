'use strict';

const config = require('./config');
const Links = require('ournet.links');

const hosts = {
	'horoscop.ournet.ro': 'ro',
	'horoscope.zborg.ru': 'ru',
	'horo.ournet.bg': 'bg',
};

function getCountry(req) {
	return hosts[req.hostname] || process.env.COUNTRY;
}

const links = {};

function getLinks(country, language) {
	if (!links[country]) {
		links[country] = Links.country(country, language);
	}
	return links[country];
}

module.exports = function(req, res, next) {
	var country = getCountry(req);
	if (!country) {
		return next(new Error('Invalid hostname', {
			hostname: req.hostname
		}));
	}
	var conf = config(country);
	res.locals.config = conf;
	res.locals.links = getLinks(conf.country, conf.language);
	next();
};
