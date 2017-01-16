'use strict';

const debug = require('debug')('ournet-horoscope:data');
const client = require('./client');
const properties = require('./properties');

exports.weather = require('./weather');
exports.places = { Place: require('./place') };

// {place:['place',{placeForecast:1002}]}
exports.get = function(props) {
	debug('getting data by props:', props);
	const data = {};
	var propertyKey;
	var variables;
	var property;

	for (var dataKey in props) {
		propertyKey = props[dataKey][0];
		variables = props[dataKey].length > 1 ? props[dataKey][1] : {};

		property = properties[propertyKey];
		data[dataKey] = {
			query: property.query,
			name: property.name,
			variables: variables
		};
	}

	debug('getting data by data:', data);

	return client.query(data);
};
