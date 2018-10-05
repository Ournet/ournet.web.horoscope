
import * as React from 'react';
import { LocalesNames } from '../../locales-names';
import * as util from 'util';
import { PlaceHelper } from '../../data/places/place-helper';
import { IndexViewModel } from '../../view-models/index-view-model';
import CommonLayout from '../common-layout';
import PageTitle from '../components/page-title';
import { Share } from '../components/share';
import ForecastBrowser from '../components/forecast/forecast-browser';
import * as moment from 'moment-timezone';

export default class IndexPage extends React.Component<IndexViewModel> {
    render() {
        const { lang, head, __, config, mainPlaces, placeIds } = this.props;

        const today = moment().tz(mainPlaces[0].timezone).locale(lang);

        return (
            <CommonLayout {...this.props}>
                <main>
                    <Share services={config.shareServices} align='right' url={head.canonical} lang={lang} />
                    <PageTitle title={head.title} subTitle={head.description} />
                    <ForecastBrowser places={placeIds} today={today} days={5} __={__} />
                </main>
            </CommonLayout>
        )
    }
}
