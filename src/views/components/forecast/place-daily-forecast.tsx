
import * as React from 'react';
import { Place, DailyForecastDataBlock } from '@ournet/api-client';
import ForecastIcon from './forecast-icon';
// import { ForecastHelpers } from '@ournet/weather-domain';
import { tz } from 'moment-timezone';
import ForecastTemp from './forecast-temp';
import { ForecastHelper } from '@ournet/weather-domain';
import { RootViewModel } from '../../../view-models/root-view-model';

export type PlaceDailyForecastViewData = {
    root: RootViewModel
    place: Place
    forecast: DailyForecastDataBlock
}

export default class PlaceDailyForecast extends React.Component<PlaceDailyForecastViewData> {
    render() {
        const { place, forecast, root } = this.props;
        const lang = root.lang;
        const items = forecast.data.map((data, index) => {
            const date = tz(data.time * 1000, place.timezone).locale(lang);
            const isWeekend = [6, 7].includes(date.isoWeekday())
            return (
                <a key={data.time} href={root.links.weather.place(place.id.toString(), { ul: lang }) + '#'+index } className={`c-fc-daily__item${isWeekend ? ' c-fc-daily--weekend' : ''}`}>
                    <div className='c-fc-daily__date'>{date.format('ddd D MMM')}</div>
                    <div className='c-fc-daily__body'>
                        <ForecastIcon icon={data.icon} root={root} />
                        {data.temperatureHigh ? <ForecastTemp temperature={data.temperatureHigh} /> : null}
                        {data.temperatureLow ? <ForecastTemp temperature={data.temperatureLow} /> : null}
                        <div className='c-fc-daily__name'>{ForecastHelper.iconName(data.icon, lang)}</div>
                    </div>
                </a>
            );
        });
        return (
            <div className='c-fc-daily'>
                {items}
            </div>
        )
    }
}
