'use strict';

var i18n = require('i18n');
var path = require('path');

i18n.configure({
	locales: ['en', 'ro'],
	directory: path.join(__dirname, 'locales')
});

module.exports = function(req, res, next) {
	var config = res.locals.config;
	var locale;
	if (req.query.ul && config.languages.indexOf(req.query.ul) > -1) {
		locale = req.query.ul;
	} else {
		locale = config.language;
	}
	res.locals.locale = res.locale = locale;
	i18n.init(req, res);
	res.setLocale(locale);

	return next();
};
