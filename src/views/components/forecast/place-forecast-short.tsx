
import * as React from 'react';
import { Place, ForecastReport } from '@ournet/api-client';
import * as moment from 'moment-timezone';
import ForecastIcon from './forecast-icon';
import ForecastTemp from './forecast-temp';
import { ForecastHelper } from '@ournet/weather-domain';
import { RootViewModel } from '../../../view-models/root-view-model';

export type PageForecastShortViewData = {
    root: RootViewModel
    place: Place
    forecast: ForecastReport
}

export default class PageForecastShort extends React.Component<PageForecastShortViewData> {
    render() {
        const { place, forecast, root } = this.props;
        if (!forecast || !forecast.details) {
            return null;
        }
        const tzStartDate = moment(new Date()).tz(place.timezone);
        const tzStartTime = Math.round(tzStartDate.toDate().getTime() / 1000);
        let startIndex = forecast.details.data.findIndex(item => item.time > tzStartTime);
        startIndex = startIndex > 0 ? startIndex : startIndex + 1;
        const data = forecast.details.data.splice(startIndex, 4);
        const lang = root.lang;
        const items = data.map(item => {
            const date = moment.tz(item.time * 1000, place.timezone).locale(lang);
            const isWeekend = [6, 7].includes(date.isoWeekday())
            return (
                <li key={item.time} className={`c-fc-short__item${isWeekend ? ' c-fc-short--weekend' : ''}`}>
                    <div className='c-fc-short__date'>{date.format('ddd D MMM')}</div>
                    <div className='c-fc-short__body'>
                        <ForecastIcon icon={item.icon} root={root} />
                        {item.temperatureHigh ? <ForecastTemp temperature={item.temperatureHigh} /> : null}
                        {item.temperatureLow ? <ForecastTemp temperature={item.temperatureLow} /> : null}
                        <div className='c-fc-short__name'>{ForecastHelper.iconName(item.icon, lang)}</div>
                    </div>
                </li>
            );
        });
        return (
            <ul className='c-fc-short'>
                {items}
            </ul>
        )
    }
}
