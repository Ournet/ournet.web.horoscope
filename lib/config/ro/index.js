'use strict';

module.exports = {
	protocol: 'https:',
	prefix: 'horoscop',
	name: 'Ournet Horoscop',
	short_name: 'Horoscop',
	language: 'ro',
	languages: ['ro'],
	country: 'ro',
	timezone: 'Europe/Bucharest',
	domain: 'ournet.ro',
	host: 'horoscop.ournet.ro',
	hour_format: 'HH:mm',
	dayFormat: 'dddd, D MMMM',
	dateFormat: 'D MMMM',
	email: 'info@ournet.ro',
	googleAnalyticsId: 'UA-1490399-11',
	favicon: '//assets.ournetcdn.net/ournet/img/icons/ournet-icon-16.png',
	placesCount: 18000,
	widgetGoogleAnalyticsId: 'UA-1490399-48',
	projects: {
		news: 'news.ournet.ro',
		weather: 'meteo.ournet.ro',
		// opinia: 'opinia.ournet.ro',
		exchange: 'curs.ournet.ro',
		horoscope: 'horoscop.ournet.ro'
	},
	shareDataServices: ['facebook', 'plusone', 'twitter'],
	socialPluginsHtmlCode: '<iframe src="https://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Fpages%2FOurNetro%2F156976714343293&amp;width=300&amp;colorscheme=light&amp;connections=10&amp;stream=false&amp;header=false&amp;height=255" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:300px; height:255px;" allowTransparency="true"></iframe>',
	internationalIds: [],
	mainPlaces: [665004, 665087, 665850, 667268, 667873, 668872, 670474, 670609, 671768, 677697, 680332, 680963, 681290, 683123, 683506, 683844, 683902, 684039, 685826, 685948, 686254],
	capitalId: 683506,
	facebookId: '120256281349646',
	exchange: {
		currency: 'RON',
		currencies: ['EUR', 'USD', 'GBP', 'CHF', 'RUB', 'MDL', 'UAH', 'CAD', 'RSD', 'AUD', 'CZK', 'PLN'],
		source: 3
	},
	weeklyName: 'saptamanal',
	oneSignal: {
		appId: '20d478b4-fb13-42db-a663-75516e67ba9a',
		safari_web_id: 'web.onesignal.auto.3f550615-46c0-4fa5-9ee8-42953ece3d19'
	},
	androidAppId: "com.ournet.horoscope"
};
