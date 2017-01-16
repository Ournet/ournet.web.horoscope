'use strict';

module.exports = {
	prefix: 'prognoza',
	name: 'Ournet.bg',
	language: 'bg',
	languages: ['bg'],
	country: 'bg',
	timezone: 'Europe/Sofia',
	domain: 'ournet.bg',
	host: 'vremeto.ournet.bg',
	hour_format: 'HH:mm',
	email: 'info@ournet-group.com',
	googleAnalyticsId: 'UA-1490399-35',
	placesCount: 6000,
	widgetGoogleAnalyticsId: 'UA-1490399-50',
	projects: {
		news: 'news.ournet.bg',
		weather: 'vremeto.ournet.bg',
		//opinia: 'mnenie.ournet.bg' //,
		exchange: 'valuta.ournet.bg'
	},
	shareDataServices: ['facebook', 'plusone', 'twitter'],
	socialPluginsHtmlCode: '<iframe src="http://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Fpages%2FOurnetbg%2F611978725607914&amp;width=300&amp;colorscheme=light&amp;connections=10&amp;stream=false&amp;header=false&amp;height=255" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:300px; height:255px;" allowTransparency="true"></iframe>',
	internationalIds: ['ro', 'cz', 'al', 'it', 'md', 'hu', 'ru', 'pl', 'in'],
	mainPlaces: [725578, 725712, 725905, 725993, 726050, 726418, 726848, 727011, 727079, 727221, 727233, 727523, 727696, 728193, 728203, 728330, 728378, 729114, 729559, 729730, 729794, 730435, 731549, 732770, 733191],
	capitalId: 727011,
	fbId: '178864255588739',
	exchange: {
		currency: 'BGN',
		currencies: ['EUR', 'USD', 'GBP', 'CHF', 'CAD', 'BYR', 'AUD', 'AZN', 'AMD'],
		source: 100
	}
};
