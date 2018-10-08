
import { HoroscopeViewModel, HoroscopeViewModelBuilder } from "./horoscope-view-model";
import { PageViewModelInput } from "./page-view-model";
import { LocalesNames } from "../locales-names";

export interface WidgetViewModel extends HoroscopeViewModel {

}

export class WidgetViewModelBuilder extends HoroscopeViewModelBuilder<WidgetViewModel, PageViewModelInput> {

    build() {
        const { __, lang, links } = this.model;
        this.model.head.title = __(LocalesNames.horoscope_on_your_site);
        this.model.head.description = __(LocalesNames.horoscope_on_your_site_info);
        this.setCanonical(links.weather.widget({ ul: lang }));

        return super.build();
    }
}
