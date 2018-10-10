
import * as React from 'react';
import { NextFunction } from "express";
import { createQueryApiClient } from "../data/api";
import { renderPage } from "../renderer";
import { maxage } from '../maxage';
import { PageViewModelInput } from '../view-models/page-view-model';
import { ApiViewModel, ApiViewModelBuilder } from '../view-models/api-view-model';
import ApiPage from '../views/api/api-page';

export function apiHandler(input: PageViewModelInput, next: NextFunction) {
    const api = createQueryApiClient<ApiViewModel>();

    maxage(input.res, 60 * 24);

    new ApiViewModelBuilder(input, api)
        .build()
        .then(data => renderPage(input.res, <ApiPage {...data} />))
        .catch(next);
}
