'use strict';

const middlewares = require('../middlewares');

exports = module.exports = function (app) {
	app.use(require('./hack'));
	app.use(require('./redirects'));

	app.use(middlewares.root);

	app.use(require('./newsletter'));
	app.use(require('./widgets'));

	app.use(middlewares.horoscope);

	app.use(require('./api'));
	app.use(require('./home'));
};
