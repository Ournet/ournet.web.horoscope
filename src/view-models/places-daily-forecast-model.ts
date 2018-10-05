

import {
    RootViewModel,
    RootViewModelInput,
} from "./root-view-model";
import {
    Place,
    DailyForecastDataPointStringFields,
    DailyForecastDataPoint,
} from "@ournet/api-client";

import { createQueryApiClient } from "../data/api";
import { AsyncViewModelBuilder } from "./async-view-model";

export type PlaceDailyForecast = {
    place: Place
    forecast: DailyForecastDataPoint
}

export interface PlacesDailyForecastViewModel extends RootViewModel {
    data: DailyForecastDataPoint[]
    places: Place[]
    reports: PlaceDailyForecast[]
}

export interface PlacesDailyForecastViewModelInput extends RootViewModelInput {
    ids: string[]
    date: string
}

export class PlacesDailyForecastViewModelBuilder extends AsyncViewModelBuilder<PlacesDailyForecastViewModel, PlacesDailyForecastViewModelInput> {
    async build() {
        const localApiClient = createQueryApiClient<{ places: Place[] }>();

        const result = await localApiClient
            .placesPlacesByIds('places', { fields: 'id name names longitude latitude timezone' }, { ids: this.input.ids })
            .execute();

        if (result.data && result.data.places) {
            const places = this.model.places = result.data.places;

            const placesData = places.map(place => ({
                longitude: place.longitude,
                latitude: place.latitude,
                timezone: place.timezone,
            }));

            this.api.weatherDatePlacesForecast('data'
                , { fields: DailyForecastDataPointStringFields }
                , { places: placesData, date: this.input.date });
        }

        return super.build();
    }

    protected formatModel(data: PlacesDailyForecastViewModel) {
        this.model.data = data.data;
        this.model.reports = [];

        data.data.forEach((report, index) => {
            if (report) {
                this.model.reports.push({
                    place: this.model.places[index],
                    forecast: report,
                })
            }
        })

        return super.formatModel(data);
    }
}
