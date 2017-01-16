'use strict';

const middlewares = require('../middlewares');

exports = module.exports = function(app) {
	app.use(middlewares.root);

	app.use(require('./newsletter'));

	app.use(middlewares.horoscope);

	app.use(require('./home'));
	app.use(require('./hack'));

	app.use(require('./redirects'));
};
