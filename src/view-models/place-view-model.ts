import { WeatherViewModel, HoroscopeViewModelBuilder } from "./horoscope-view-model";
import { Place, ForecastReport, PlaceStringFields, ForecastReportStringFields, PublicHoliday, PublicHolidayStringFields } from "@ournet/api-client";
import { PageViewModelInput } from "./page-view-model";
import { createQueryApiClient } from "../data/api";
import { notFound } from "boom";
import { unixTime } from "../utils";
import { I18nFn } from "../locale";
import { PlaceHelper } from "../data/places/place-helper";
import * as util from 'util';
import { atonic } from "@ournet/domain";


export interface PlaceViewModel extends WeatherViewModel {
    place: Place
    placeForecast: ForecastReport
    holidays: PublicHoliday[]
    title: string
    subTitle: string
    description: string
}

export interface PlaceViewModelInput extends PageViewModelInput {
    id: string
}

export class PlaceViewModelBuilder<T extends PlaceViewModel> extends HoroscopeViewModelBuilder<T, PlaceViewModelInput> {

    async build() {
        const id = this.input.id;
        const { country, lang, __, links } = this.model;

        const localeApi = createQueryApiClient<{ place: Place }>();
        const result = await localeApi.placesPlaceById('place', {
            fields: PlaceStringFields,
        }, { id }).execute();

        if (!result.data || !result.data.place) {
            throw notFound(`Not found place=${id}`);
        }

        const place = this.model.place = result.data.place;

        const info = getPageInfo(place, __, lang);

        this.model.head.title = info.pageTitle;
        this.model.head.description = info.description;
        this.model.title = info.title;
        this.model.subTitle = info.subTitle;
        this.model.description = info.description;

        this.setCanonical(links.weather.place(place.id, { ul: lang }));

        this.api.weatherForecastReport('placeForecast', {
            fields: ForecastReportStringFields,
        },
            { place: { longitude: place.longitude, latitude: place.latitude, timezone: place.timezone } });

        const date = new Date();
        date.setUTCHours(0, 0, 0, 0);
        const startTime = unixTime(date);
        date.setUTCDate(date.getUTCDate() + 10);
        // const endTime = unixTime(date);

        this.api.publicHolidays('holidays', { fields: PublicHolidayStringFields },
            { country, lang, start: startTime });

        return super.build();
    }

    protected formatModel(data: T) {
        this.model.placeForecast = data.placeForecast;
        this.model.holidays = data.holidays || [];

        return super.formatModel(data);
    }
}

function getPageInfo(place: Place, __: I18nFn, lang: string) {

    const name = PlaceHelper.getName(place, lang)
    const inname = PlaceHelper.inPlaceName(place, lang)
    const adm1 = place.admin1

    let title: string
    let description: string
    let pageTitle: string
    let subTitle: string

    //if is adm1
    if (!adm1) {
        pageTitle = util.format(__('weather_item_head_title_format'), inname, name);

        description =
            util.format(__('weather_item_head_description_format'), inname + util.format(' (%s)', place.name), place.asciiname);

        title = util.format(__('weather_title_format'), inname);

        subTitle = util.format(__('place_weather_details_info'), name, place.asciiname, place.name);

    } else {

        const admname = PlaceHelper.getName(adm1, lang);
        const shortadmname = PlaceHelper.shortAdm1Name(adm1, lang);

        let longname = inname;

        if (!PlaceHelper.isBigCity(place, 10000)) {
            longname = (place.name !== adm1.name && adm1.name.indexOf(place.name) === -1) ? util.format('%s, %s', longname, shortadmname) : longname;
        }

        pageTitle = util.format(__('weather_item_head_title_format'), longname, name);

        if (pageTitle.length > 80) {
            pageTitle = util.format(__('weather_item_head_title_format'), longname, name);
        }

        description =
            util.format(__('weather_item_head_description_format'),
                longname + util.format(' (%s, %s)', place.asciiname, adm1.asciiname), place.name);

        subTitle = util.format(__('place_weather_details_info'), longname, util.format('%s, %s', place.asciiname, admname), name);

        title = util.format(__('weather_title_format'), longname);
    }

    if (lang === 'ro') {
        pageTitle = atonic(pageTitle);
    }

    return {
        pageTitle,
        title,
        description,
        subTitle
    }
} 
