'use strict';

module.exports = {
	place: {
		name: 'places_place',
		query: '(id:$placeId){id population latitude longitude feature_code feature_class country_code name asciiname alternatenames region{id asciiname country_code admin1_code name alternatenames}}'
	},
	places: {
		name: 'places_places',
		query: '(ids:$ids){id latitude longitude country_code name asciiname alternatenames admin1_code}'
	},
	regionPlaces: {
		name: 'places_places',
		query: '(regionKey:$regionKey,limit:$limit){id latitude longitude country_code name asciiname alternatenames admin1_code}'
	},
	searchPlace: {
		name: 'places_searchPlace',
		query: '(country:$country,query:$query,limit:$limit){id latitude longitude country_code name asciiname alternatenames admin1_code region{id asciiname country_code admin1_code name alternatenames}}'
	},
	region: {
		name: 'places_region',
		query: '(admin1:$admin1,country:$country){id latitude longitude feature_code feature_class country_code name asciiname alternatenames admin1_code}'
	},
	regions: {
		name: 'places_regions',
		query: '(limit:$limit,country:$country){id latitude longitude feature_code feature_class country_code name asciiname alternatenames admin1_code}'
	},
	placeForecast: {
		name: 'places_place',
		query: '(id:$placeId){id population latitude longitude feature_code feature_class country_code name asciiname alternatenames region{id asciiname country_code admin1_code name alternatenames}forecast}'
	},
	placeCurrentForecast: {
		name: 'places_place',
		query: '(id:$placeId){id latitude longitude feature_code feature_class country_code name asciiname alternatenames currentForecast}'
	},
	forecast: {
		name: 'weather_report',
		query: '(latitude:$latitude,longitude:$longitude)'
	},
	placesForecast: {
		name: 'weather_placesReport',
		query: '(date:$date,places:$places)'
	},
	latestStories: {
		name: 'news_stories',
		query: '(country:$country,lang:$lang,limit:$limit,order:"-createdAt") {id title imageId uniqueName}'
	},
	mainExchangeRates: {
		name: 'exchange_rates',
		query: '(keys:$keys){rate: sale rate1d: sale1d currency{code htmlName symbol}}'
	},
	exchangeSource: {
		name: 'exchange_source',
		query: '(country:$country,id:$sourceId){id name shortName abbr}'
	},
	holidays: {
		name: 'holidays',
		query: '(country:$country,lang:$lang)'
	},
	placeoldid: {
		name: 'places_placeoldid',
		query: '(id:$id){id geonameid}'
	},
	horoscopeReport: {
		name: 'horoscope_report',
		query: '(id:$id){id period text sign}'
	},
	horoscopeReports: {
		name: 'horoscope_reports',
		query: '(where:$where,limit:$limit,order:$order){id period text sign}'
	}
};
