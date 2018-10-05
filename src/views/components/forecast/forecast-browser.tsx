
import * as React from 'react';
import { Moment } from 'moment';
import { I18nFn } from '../../../locale';
import { LocalesNames } from '../../../locales-names';


export type ForecastBrowserProps = {
    places: string[]
    today: Moment
    days: number
    __: I18nFn
}


export default class ForecastBrowser extends React.Component<ForecastBrowserProps>{
    render() {
        const { places, days, today, __ } = this.props;
        const dates: Moment[] = [today];
        for (let i = 1; i < days; i++) {
            dates.push(today.clone().add(i, 'd'));
        }

        return (
            <div className='c-forbro' data-ids={places.join(',')}>
                <ul className='c-forbro__tabs'>
                    {dates.map((date, index) => (<li key={index} className={index === 0 ? 'c-forbro__tabs--selected' : ''} data-date={date.toISOString().substr(0, 10)}>{index === 0 ? __(LocalesNames.today) : date.format('dddd')}</li>))}
                </ul>
                <div className='c-forbro__content'>
                </div>
            </div>
        )
    }
}
