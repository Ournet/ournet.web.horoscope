import * as React from 'react';
import { RootViewModel } from '../../../view-models/root-view-model';
import { Place, HoursForecastDataBlock, HoursForecastDataPoint, PublicHoliday } from '@ournet/api-client';
import * as moment from 'moment-timezone';
import PlaceDayReport from './place-day-report';
import { LocalesNames } from '../../../locales-names';

export type PlaceDailyReportPorps = {
    root: RootViewModel
    place: Place
    report: HoursForecastDataBlock
    holidays: PublicHoliday[]
}

export default class PlaceDailyReport extends React.Component<PlaceDailyReportPorps>{
    render() {
        const daysData: HoursForecastDataPoint[][] = []
        const { place, report, root, holidays } = this.props;
        const { __ } = root;

        if (!report || !report.data) {
            return <div className='c-nodata'>{__(LocalesNames.forecast_no_data)}</div>
        }

        const timezone = place.timezone;
        let lastDay = -1;

        report.data.forEach(item => {
            let list = daysData[daysData.length - 1] || [];
            const date = moment(item.time * 1000).tz(timezone);
            if (lastDay !== date.date()) {
                list = [];
                daysData.push(list);
            }
            list.push(item);
            lastDay = date.date();
        });

        const items = daysData.map((dayData, index) => {
            const row = <PlaceDayReport key={index} root={root} holidays={holidays} filter={index === 0} place={place} report={{ icon: 0, data: dayData }} />
            if (index === 1) {
                return [
                    <div className='c-ad c-ad--wide'>
                        <ins className='adsbygoogle' style={{ display: 'block' }} data-ad-client='ca-pub-3959589883092051' data-ad-slot='2239682634' data-ad-format='auto'></ins>
                        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
                    </div>,
                    row
                ]
            }
            if (index === 5) {
                return [
                    <div className='c-ad'>
                        <ins className='adsbygoogle' style={{ display: 'block' }} data-ad-client='ca-pub-3959589883092051' data-ad-slot='3716415837' data-ad-format='auto'></ins>
                        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
                    </div>,
                    row
                ]
            }
            return row;
        })

        return (
            <div className='c-daily-report'>
                {items}
            </div>
        )
    }
}
