import { PageViewModel, PageViewModelInput, PageViewModelBuilder } from "./page-view-model";
import { Place, HourlyForecastDataPoint, HourlyForecastDataPointStringFields, NewsEvent, OurnetQueryApi } from "@ournet/api-client";
import { createQueryApiClient } from "../data/api";
import logger from "../logger";
import * as moment from "moment-timezone";
import { LocalesNames } from "../locales-names";


export class HoroscopeViewModelBuilder<T extends HoroscopeViewModel, I extends PageViewModelInput> extends PageViewModelBuilder<T, I> {

    constructor(input: I, api: OurnetQueryApi<T>) {
        super(input, api);
        
        const model = this.model;
        const { lang, config, __ } = model;

        const currentDate = model.currentDate = moment().tz(config.timezone).locale(lang);
        model.currentDayPeriod = 'D' + currentDate.format('YYYYMMDD');
        model.currentWeekPeriod = 'W' + currentDate.format('YYYYWW');

        const weekStartDate = currentDate.clone().isoWeekday(1).locale(lang);
        const weekEndDate = currentDate.clone().isoWeekday(7).locale(lang);

        model.currentDayPeriodText = currentDate.format(__(LocalesNames.day_format));
        model.currentWeekPeriodText = weekStartDate.format('D MMM') + ' - ' + weekEndDate.format('D MMMM YYYY');
    }

    async build() {
        const apiClient = createQueryApiClient<T>();

        const model = this.model;
        const { country, lang } = model;

        const result = await apiClient
            .placesPlaceById('capital', { fields: 'id name names longitude latitude timezone' },
                { id: model.config.capitalId })
            .execute();

        if (result.errors && result.errors.length) {
            logger.error(result.errors[0]);
        }

        if (result.data && result.data.capital) {
            model.capital = result.data.capital

            const { longitude,
                latitude,
                timezone, } = model.capital;

            this.api.weatherNowPlaceForecast('capitalForecast', { fields: HourlyForecastDataPointStringFields },
                { place: { longitude, latitude, timezone } });
        }

        this.api.newsEventsLatest('latestNews', { fields: 'id title slug imageId createdAt' }, { params: { country, lang, limit: 4 } });

        return super.build();
    }

    protected formatModel(data: T) {
        if (data.capitalForecast) {
            this.model.capitalForecast = data.capitalForecast;
        }
        this.model.latestNews = data.latestNews || [];

        return super.formatModel(data);
    }
}


export interface HoroscopeViewModel extends PageViewModel {
    capital: Place
    capitalForecast: HourlyForecastDataPoint
    latestNews: NewsEvent[]

    currentDate: moment.Moment
    currentDayPeriod: string
    currentWeekPeriod: string
    currentDayPeriodText: string
    currentWeekPeriodText: string

    title: string
    subTitle: string
}
