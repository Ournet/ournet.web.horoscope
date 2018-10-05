
import { WeatherViewModel, HoroscopeViewModelBuilder } from "./horoscope-view-model";
import { PageViewModelInput } from "./page-view-model";
import * as util from 'util';
import { LocalesNames, LocalesHelper } from "../locales-names";
import { PlaceHelper } from "../data/places/place-helper";

export interface WidgetViewModel extends WeatherViewModel {

}

export class WidgetViewModelBuilder extends HoroscopeViewModelBuilder<WidgetViewModel, PageViewModelInput> {

    build() {
        const { __, lang, links, country } = this.model;
        this.model.head.title = __(LocalesNames.weather_on_your_site);
        this.model.head.description = util.format(__(LocalesNames.weather_on_your_site_info), PlaceHelper.inCountryName(LocalesHelper.getCountryName(__, country), lang));
        this.setCanonical(links.weather.widget({ ul: lang }));

        return super.build();
    }
}
