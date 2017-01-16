'use strict';

const Data = require('../lib/data');
const assert = require('assert');

describe('data', function() {

	it('get exchange data', function() {
		return Data.get({
				source: ['exchangeSource', { country: 'md', sourceId: 2 }]
			})
			.then(result => {
				// console.log(result);
				assert.ok(result);
				assert.ok(result.source);
			});
	});

});
