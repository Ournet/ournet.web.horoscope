
import * as React from 'react';
import { RootViewModel } from '../../../view-models/root-view-model';
import { HoroscopeReport } from '@ournet/api-client';
import { HoroscopesHelper, HoroscopeSign } from '@ournet/horoscopes-domain';
import { formatSignDates, encodeReportText } from '../../../helpers';


export type DayReportProps = {
    root: RootViewModel
    report: HoroscopeReport
    date?: string
    footer?: boolean
}

export default class HoroscopeDayReport extends React.Component<DayReportProps> {
    render() {
        const { date, report, root, footer } = this.props;
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
                        <div className='c-report__dates'>{formatSignDates(report.sign, config.signDateFormat, lang)}</div>
                    </div>
                </a>
                <div className='c-report__body'>
                    <div className='c-report__text' dangerouslySetInnerHTML={{ __html: encodeReportText(report.text) }}></div>
                    {footer && <div className='c-report__footer'><div className='c-report__numbers'>{report.numbers.map((no, i) => <span key={i}>{no}</span>)}</div></div>}
                </div>
            </div >
        )
    }
}
