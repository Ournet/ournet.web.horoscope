import { PageViewModel, PageViewModelInput, PageViewModelBuilder } from "./page-view-model";
import { Place, HourlyForecastDataPoint, HourlyForecastDataPointStringFields, NewsEvent } from "@ournet/api-client";
import { createQueryApiClient } from "../data/api";
import logger from "../logger";


export class HoroscopeViewModelBuilder<T extends WeatherViewModel, I extends PageViewModelInput> extends PageViewModelBuilder<T, I> {
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


export interface WeatherViewModel extends PageViewModel {
    capital: Place
    capitalForecast: HourlyForecastDataPoint
    latestNews: NewsEvent[]
}
