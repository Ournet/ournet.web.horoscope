'use strict';

const cocoshel = require('cocoshel-mongo-storage');
const cachify = require('transparentcache');

const EmailSubscriber = module.exports = new cocoshel.Subscriber(cocoshel.db(cocoshel.connect(process.env.COCOSHEL_CONNECTION)));

// cachify EmailSubscriber
//

cachify(EmailSubscriber, {
	cachingStrategy: new cachify.strategies.Timeout({ ttl: 1000 * 60 * 10 }),
	methods: {
		count: [0]
	}
});
