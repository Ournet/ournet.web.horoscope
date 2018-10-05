
import * as React from 'react';
import { Place, HourlyForecastDataPoint } from '@ournet/api-client';
import PlaceLinkForecast from './place-link-forecast';
import { RootViewModel } from '../../../view-models/root-view-model';


export type ListPlaceLinkForecastViewData = {
    root: RootViewModel
    list: { place: Place, forecast: HourlyForecastDataPoint }[]
}

export default class ListLinkPlaceForecast extends React.Component<ListPlaceLinkForecastViewData> {
    render() {
        const { root, list } = this.props;

        const items = list.map(item => {
            return (
                <li>
                    <PlaceLinkForecast key={item.place.id} root={root} place={item.place} forecast={item.forecast} />
                </li>
            )
        });

        return (
            <ul className='c-list-link-fc'>
                {items}
            </ul>
        )
    }
}
