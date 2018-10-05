
import * as React from 'react';
import { Place, HoursForecastDataBlock, PublicHoliday } from '@ournet/api-client';
import ForecastIcon from './forecast-icon';
// import { ForecastHelpers } from '@ournet/weather-domain';
import * as moment from 'moment-timezone';
import ForecastTemp from './forecast-temp';
import { ForecastHelper } from '@ournet/weather-domain';
import { RootViewModel } from '../../../view-models/root-view-model';
import { LocalesNames } from '../../../locales-names';
import { toBeaufort, unixTime } from '../../../utils';
import { PlaceDailyForecast } from '../../../view-models/places-daily-forecast-model';
import { PlaceHelper } from '../../../data/places/place-helper';

export type PlacesDailyForecastViewData = {
    root: RootViewModel
    reports: PlaceDailyForecast[]
}

export default class PlacesDailyForecast extends React.Component<PlacesDailyForecastViewData> {
    render() {
        const { reports, root, } = this.props;
        const { lang, __, links } = root;

        return (
            <div className='c-places-daily-forecast' >
                {reports.map(item => (
                    <div key={item.place.id} className='dr-row'>
                        <div className='dr-r dr-r-date'>
                            <a href={links.weather.place(item.place.id, { ul: lang })}>{PlaceHelper.getName(item.place, lang)}</a>
                        </div>
                        <div className='dr-r dr-r-temp'>
                            <ForecastIcon icon={item.forecast.icon} root={root} />
                            <ForecastTemp temperature={item.forecast.temperature} />
                            <span className='symbol-name'>{ForecastHelper.iconName(item.forecast.icon, lang)}</span>
                        </div>
                        <div className='dr-r dr-r-wind'>
                            <span className={'wind-speed beaufort-' + toBeaufort(item.forecast.windSpeed || 1)}>{item.forecast.windSpeed}</span>
                            <span className='wind-dir'>{item.forecast.windDir}</span>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}
