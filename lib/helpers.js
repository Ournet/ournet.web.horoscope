
const data = require('../data/zodiac-signs-dates.json');
const moment = require('moment');

exports.horoscopeSignDates = function (sign) {
    return data[sign];
}

exports.formatSignDates = function (sign, dateFormat) {
    const date = exports.horoscopeSignDates(sign);

    const month = date.startMonth - 1;
    const startDate = moment(new Date(2017, month, date.startDay));
    const endDate = moment(new Date(2017, month + 1, date.endDay));
    return [startDate.format(dateFormat), endDate.format(dateFormat)].join(' - ');
}
