
import * as React from 'react';
import { NextFunction } from "express";
import { createQueryApiClient } from "../data/api";
import { renderPage } from "../renderer";
import { PlacesViewModelInput, PlacesViewModel, PlacesViewModelBuilder } from '../view-models/places-view-model';
import PlacesPage from '../views/places/places-page';
import { PlacesDailyForecastViewModelInput, PlacesDailyForecastViewModel, PlacesDailyForecastViewModelBuilder } from '../view-models/places-daily-forecast-model';
import PlacesDailyForecast from '../views/components/forecast/places-daily-forecast';
import { maxageIndex, maxagePlaces } from '../maxage';

export function placesHandler(input: PlacesViewModelInput, next: NextFunction) {
    const api = createQueryApiClient<PlacesViewModel>();

    maxagePlaces(input.res);

    new PlacesViewModelBuilder(input, api)
        .build()
        .then(data => {
            if (input.q && input.q.trim().length > 1) {
                if (data.places.length === 1) {
                    return input.res.redirect(data.links.weather.place(data.places[0].id, { ul: data.lang }));
                }
            }

            renderPage(input.res, <PlacesPage {...data} />);
        }).catch(next);
}

export function placesDailyForecastHandler(input: PlacesDailyForecastViewModelInput, next: NextFunction) {
    const api = createQueryApiClient<PlacesDailyForecastViewModel>();

    maxageIndex(input.res);

    new PlacesDailyForecastViewModelBuilder(input, api)
        .build()
        .then(data => renderPage(input.res, <PlacesDailyForecast root={data} reports={data.reports} />))
        .catch(next);
}
