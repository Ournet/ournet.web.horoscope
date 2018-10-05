
import * as React from 'react';
import { Place, ForecastReport } from '@ournet/api-client';
import { RootViewModel } from '../../../view-models/root-view-model';

export type PageForecastCardViewData = {
    root: RootViewModel
    place: Place
    forecast: ForecastReport
}

export default class PageForecastCard extends React.Component<PageForecastCardViewData> {
    render() {
        const { place } = this.props;
        return (
            <div className='c-fc-card'>
                {place.name} Forecast card
            </div>
        )
    }
}
