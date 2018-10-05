
import * as React from 'react';
import { HoursForecastDataPoint, Place } from '@ournet/api-client';
import ForecastIcon from './forecast-icon';
import ForecastTemp from './forecast-temp';
import * as moment from 'moment-timezone';
import { RootViewModel } from '../../../view-models/root-view-model';

export type HoursForecastLineViewData = {
    root: RootViewModel
    place: Place
    forecast: HoursForecastDataPoint
}

export default class HoursForecastLine extends React.Component<HoursForecastLineViewData> {
    render() {
        const { forecast, place, root } = this.props;
        const date = moment.tz(forecast.time * 1000, place.timezone).locale(root.lang);
        return (
            <div className='c-fc-hs-line'>
                <time dateTime={date.toISOString()}>{date.fromNow()}</time>
                <ForecastIcon root={this.props.root} icon={forecast.icon} />
                <ForecastTemp temperature={forecast.temperature} />
            </div>
        )
    }
}
