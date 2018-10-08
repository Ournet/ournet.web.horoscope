
import { HoroscopeViewModel, HoroscopeViewModelBuilder } from "./horoscope-view-model";
import { PageViewModelInput } from "./page-view-model";
import { LocalesNames } from "../locales-names";
import * as util from 'util';
import { HoroscopeReport, HoroscopeReportStringFields } from "@ournet/api-client";
import { HoroscopesHelper, HoroscopeSign } from "@ournet/horoscopes-domain";

export interface IndexViewModelInput extends PageViewModelInput {

}

export interface IndexViewModel extends HoroscopeViewModel {
    reports: HoroscopeReport[]
}

export class IndexViewModelBuilder extends HoroscopeViewModelBuilder<IndexViewModel, IndexViewModelInput> {

    build() {

        const { lang, links, __, head, currentDayPeriodText, currentDayPeriod } = this.model;

        head.title = __(LocalesNames.daily_horoscope);
        head.description = __(LocalesNames.daily_horoscope_details);

        this.setCanonical(links.horoscope.home({ ul: lang }));

        this.model.title = util.format(__(LocalesNames.daily_horoscope_format), currentDayPeriodText);
        this.model.subTitle = util.format(__(LocalesNames.daily_horoscope_details_format), currentDayPeriodText);

        const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(sign => HoroscopesHelper.createReportId(currentDayPeriod, lang, sign as HoroscopeSign));

        this.api.horoscopesReportsByIds('reports', { fields: HoroscopeReportStringFields }, { ids });
        
        return super.build();
    }

    protected formatModel(data: IndexViewModel) {
        this.model.reports = data.reports || [];

        return super.formatModel(data);
    }
}
