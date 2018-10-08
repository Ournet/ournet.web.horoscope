const data = require('../zodiac-signs-dates.json');
const moment = require('moment-timezone');

function horoscopeSignDates(sign: number) {
    return data[sign];
}

export function formatSignDates(sign: number, dateFormat: string) {
    const date = horoscopeSignDates(sign);

    const month = date.startMonth - 1;
    const startDate = moment(new Date(2017, month, date.startDay));
    const endDate = moment(new Date(2017, month + 1, date.endDay));
    return [startDate.format(dateFormat), endDate.format(dateFormat)].join(' - ');
}