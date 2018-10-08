
import * as React from 'react';
import { RootViewModel } from '../../../view-models/root-view-model';
import { HoroscopeReport } from '@ournet/api-client';
import { HoroscopesHelper, HoroscopeSign } from '@ournet/horoscopes-domain';
import { formatSignDates } from '../../../helpers';


export type DayReportProps = {
    root: RootViewModel
    report: HoroscopeReport
    date?: string
    footer?: boolean
}

export default class HoroscopeDayReport extends React.Component<DayReportProps> {
    render() {
        const { date, report, root } = this.props;
        const { lang, links, config } = root;
        const sign = HoroscopesHelper.getSignName(report.sign as HoroscopeSign, lang);

        if (!sign) {
            return null;
        }

        return (
            <div className='c-report'>
                {date ? <div className='c-report__date'>{date}</div> : null}
                <a className='c-report__head' href={links.horoscope.sign(sign.slug, { ul: lang })}>
                    <div className='c-report__icon'>
                        <div className='c-zs-icon'>
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                                <use href={"#svg-zs-icon-" + report.sign}></use>
                            </svg>
                        </div>
                        <h4>{sign.name}</h4>
                        <div className='c-report__dates'>{formatSignDates(report.sign, config.dateFormat)}</div>
                    </div>
                </a>
                <div className='c-report__body'>
                    <div className='c-report__text'>{report.text}</div>
                </div>
            </div >
        )
    }
}
