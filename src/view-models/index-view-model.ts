
import { HoroscopeViewModel, HoroscopeViewModelBuilder } from "./horoscope-view-model";
import { PageViewModelInput } from "./page-view-model";
import { LocalesNames } from "../locales-names";
import * as util from 'util';

export interface IndexViewModelInput extends PageViewModelInput {
    listId?: string
}

export interface IndexViewModel extends HoroscopeViewModel {
    placeIds: string[]
}

export class IndexViewModelBuilder extends HoroscopeViewModelBuilder<IndexViewModel, IndexViewModelInput> {

    build() {

        const { lang, links, __, head, currentDayPeriodText } = this.model;

        head.title = __(LocalesNames.daily_horoscope);
        head.description = __(LocalesNames.daily_horoscope_details);

        this.setCanonical(links.horoscope.home({ ul: lang }));
        
        this.model.title = util.format(__(LocalesNames.daily_horoscope_format), currentDayPeriodText);
        this.model.subTitle = util.format(__(LocalesNames.daily_horoscope_details_format), currentDayPeriodText);

        return super.build();
    }

    protected formatModel(data: IndexViewModel) {


        return super.formatModel(data);
    }
}
