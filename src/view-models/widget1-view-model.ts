
import { PageViewModelInput, PageViewModel, PageViewModelBuilder } from "./page-view-model";
import { Place, DailyForecastDataBlock, ForecastReportStringFields, ForecastReport } from "@ournet/api-client";
import { createQueryApiClient } from "../data/api";
import { PlaceNoAdmin1Fields } from "../data/common";
import { notFound } from "boom";

export interface Widget1ViewModelInput extends PageViewModelInput {
    id: string
    days: number
    w: number
    bcolor?: string
    bkcolor?: string
    hbkcolor?: string
    htcolor?: string
    lcolor?: string
    textcolor?: string
}

export interface Widget1ViewModel extends PageViewModel {
    place: Place
    forecast: ForecastReport
    report: DailyForecastDataBlock

    days: number
    w: number
    bcolor: string
    bkcolor: string
    hbkcolor: string
    htcolor: string
    lcolor: string
    textcolor: string
}

export class Widget1ViewModelBuilder extends PageViewModelBuilder<Widget1ViewModel, Widget1ViewModelInput> {

    async build() {

        this.model.textcolor = this.input.textcolor || '848484';
        this.model.bcolor = this.input.bcolor || 'CA0000';
        this.model.bkcolor = this.input.bkcolor || 'FFF';
        this.model.hbkcolor = this.input.hbkcolor || 'CA0000';
        this.model.htcolor = this.input.htcolor || 'FFF';
        this.model.lcolor = this.input.lcolor || 'DDD';
        this.model.days = this.input.days;
        this.model.w = this.input.w;

        if (isNaN(this.model.days) || this.model.days < 1 || this.model.days > 9) {
            this.model.days = 5;
        }
        if (isNaN(this.model.w) || this.model.w < 50) {
            this.model.w = 200;
        }


        const localApi = createQueryApiClient<{ place: Place }>();
        const result = await localApi.placesPlaceById('place', { fields: PlaceNoAdmin1Fields },
            { id: this.input.id }).execute();
        if (!result.data || !result.data.place) {
            throw notFound(`Not found place id=${this.input.id}`);
        }
        const place = this.model.place = result.data.place;

        this.api.weatherForecastReport('forecast', { fields: ForecastReportStringFields },
            { place: { timezone: place.timezone, latitude: place.latitude, longitude: place.longitude } });

        return super.build();
    }

    protected formatModel(data: Widget1ViewModel) {
        const { forecast } = data;
        if (forecast.daily) {
            this.model.report = forecast.daily
        }

        return super.formatModel(data);
    }
}
