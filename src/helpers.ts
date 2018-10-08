const data = require('../zodiac-signs-dates.json');
import * as moment from 'moment-timezone';
import { encodeHTML } from './utils';

function horoscopeSignDates(sign: number) {
    return data[sign];
}

export function formatSignDates(sign: number, dateFormat: string, lang: string) {
    const date = horoscopeSignDates(sign);

    const month = date.startMonth - 1;
    const startDate = moment(new Date(2017, month, date.startDay)).locale(lang);
    const endDate = moment(new Date(2017, month + 1, date.endDay)).locale(lang);
    return [startDate.format(dateFormat), endDate.format(dateFormat)].join(' - ');
}

export function encodeReportText(text: string) {
    return text.split(/\n/g).map(line => {
        return '<p>' + encodeHTML(line) + '</p>';
    }).join('');
}
