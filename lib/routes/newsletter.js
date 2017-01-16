'use strict';

var express = require('express');
var utils = require('../utils');
var Promise = utils.Promise;
var logger = require('../logger');
var EmailSubscriber = require('../data/email_subscriber');
/*eslint new-cap:1*/
var route = module.exports = express.Router();

function sendData(res, data, statusCode) {
	utils.maxage(res, 0);
	statusCode = statusCode || 200;

	res.status(statusCode).send(data);
}

//index

route.post('/newsletter/subscribe', function(req, res) {
	const sign = req.body.sign;
	if (!sign || !/^\d+$/.test(sign)) {
		return sendData(res, { message: 'Error!' }, 400);
	}
	const email = req.body.email;
	if (!email || !utils.isemail(email)) {
		return sendData(res, { message: 'Invalid email!' }, 400);
	}

	const currentCulture = res.locals.currentCulture;

	const data = {
		group: 'horoscope-' + currentCulture.country,
		target: sign,
		email: email,
		ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'none',
		referer: req.get('Referer'),
		lang: currentCulture.language,
		country: currentCulture.country
	};

	data.ip = data.ip.split(',')[0].trim();

	var subscriberId = EmailSubscriber.createId(data);

	EmailSubscriber.one({ where: { _id: subscriberId } })
		.then(function(subscriber) {
			if (subscriber) {
				logger.warn('Newsleter: subscriber exists:', subscriber);
				return sendData(res, { message: 'You are subscribed!' });
			}

			return EmailSubscriber.subscribe(data)
				.then(function() {
					logger.warn('Newsleter: new subscriber:', data);
					return sendData(res, { message: 'Done!' });
				});
		})
		.catch(function(error) {
			logger.error('Newsleter: error:' + error.message, data);
			sendData(res, error, 500);
		});

});

route.get('/newsletter/unsubscribe/:id', function(req, res, next) {
	var ids = req.params.id.split(/[,;]/g);
	var links = res.locals.links;

	Promise.map(ids, function(id) {
			return EmailSubscriber.unsubscribe({ id: id });
		})
		.then(function() {
			logger.warn('Newsleter: unsubscriber' + req.params.id);
			// return sendData(res, { message: 'Done!' });
			return res.redirect(307, links.horoscope.home({ ul: res.locals.currentCulture.language, utm_source: 'newsletter', utm_medium: 'app', utm_campaign: 'unsubscribe' }));
		})
		.catch(function(error) {
			logger.error('Newsleter unsubscribe: error:' + error.message, ids);
			next(error);
		});
});
