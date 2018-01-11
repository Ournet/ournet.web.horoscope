'use strict';

// const debug = require('debug')('ournet-horoscope:data');
let signsNames = {};
const signsNamesBySlug = {};
const Data = require('ournet.web.data');
const LRU = require('lru-cache');
const fetch = require('node-fetch');

exports.weather = require('./weather');
exports.places = { Place: require('./place') };

exports.init = function () {
	return exports.get({ signsNames: ['horoscopeSignsNames'] })
		.then(function (reslut) {
			signsNames = reslut.signsNames;

			Object.keys(signsNames).forEach(id => {
				const signName = signsNames[id];
				// console.log('signName', signName);
				Object.keys(signName).forEach(lang => {
					signsNamesBySlug[lang] = signsNamesBySlug[lang] || {};
					signsNamesBySlug[lang][signName[lang].slug] = signName[lang];
					signsNamesBySlug[lang][signName[lang].slug].id = id;
				});
			});

			// console.log(signsNamesBySlug);
		});
};

// {place:['place',{placeForecast:1002}]}
exports.get = Data.get;

exports.signsNames = function () {
	return signsNames;
};

exports.signName = function (id, lang) {
	return signsNames[id][lang];
};

exports.signNameBySlug = function (lang, slug) {
	return signsNamesBySlug[lang][slug];
};

const descoperoCache = LRU({ max: 1, maxAge: 1000 * 60 * 60 });

exports.getDescoperoNews = function () {
	const KEY = 'articles';
	let descoperoData = descoperoCache.get(KEY);
	if (descoperoData) {
		return Promise.resolve(descoperoData);
	}
	return fetch('http://descope.ro/_api/ournet_articles.json')
		.then(response => response.json())
		.then(response => {
			descoperoCache.set(KEY, response.articles);
			return response.articles;
		});
}
