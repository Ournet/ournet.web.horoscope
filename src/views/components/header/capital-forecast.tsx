
import * as React from 'react';
import { RootViewModel } from '../../../view-models/root-view-model';
import { Place, HourlyForecastDataPoint } from '@ournet/api-client';
import ForecastTemp from '../forecast/forecast-temp';
import ForecastIcon from '../forecast/forecast-icon';
import { PlaceHelper } from '../../../data/places/place-helper';

export interface CapitalForecastComponentProps {
    root: RootViewModel
    place: Place
    forecast: HourlyForecastDataPoint
}

export default class CapitalForecastComponent extends React.Component<CapitalForecastComponentProps> {
    render() {
        const { place, forecast, root } = this.props;
        const { __, links, lang } = root;
        const name = PlaceHelper.getName(place, lang);
        return (
            <div className='c-cap'>
                <ForecastIcon root={root} icon={forecast.icon} />
                <span className='c-cap__name'>
                    <a href={links.weather.place(place.id, { ul: lang })} title={name}>{name}</a>
                    <ForecastTemp temperature={forecast.temperature} />
                </span>
            </div>
        )
    }
}
