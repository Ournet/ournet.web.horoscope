
import * as React from 'react';
import { IndexViewModel } from '../../view-models/index-view-model';
import CommonLayout from '../common-layout';
import PageTitle from '../components/page-title';
import { Share } from '../components/share';
import HoroscopeDayReport from '../components/horoscope/day-report';

export default class IndexPage extends React.Component<IndexViewModel> {
    render() {
        const { lang, head, __, config, title, subTitle, reports } = this.props;

        return (
            <CommonLayout {...this.props}>
                <main>
                    <div className='u-report-margin'>
                        <Share services={config.shareServices} align='right' url={head.canonical} lang={lang} />
                        <PageTitle title={title || head.title} subTitle={subTitle || head.description} />
                    </div>
                    {reports.map((report, i) => <HoroscopeDayReport root={this.props} key={i} report={report} />)}
                </main>
            </CommonLayout>
        )
    }
}
