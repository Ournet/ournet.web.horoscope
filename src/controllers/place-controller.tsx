
import * as React from 'react';
import { NextFunction } from "express";
import { createQueryApiClient } from "../data/api";
import { renderPage } from "../renderer";
import PlacePage from '../views/place/place-page';
import { PlaceViewModelInput, PlaceViewModelBuilder, PlaceViewModel } from '../view-models/place-view-model';
import { maxagePlace, maxage } from '../maxage';

export function placeHandler(input: PlaceViewModelInput, next: NextFunction) {
    const api = createQueryApiClient<PlaceViewModel>();

    maxagePlace(input.res);

    new PlaceViewModelBuilder(input, api)
        .build()
        .then(data => {
            if (!data.placeForecast) {
                maxage(input.res, 0.5);
            }
            return renderPage(input.res, <PlacePage {...data} />)
        })
        .catch(next);
}
