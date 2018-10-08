
import * as React from 'react';
import { NextFunction } from "express";
import { createQueryApiClient } from "../data/api";
import { renderPage } from "../renderer";
import { maxageSign } from '../maxage';
import { SignViewModel, SignViewModelInput, SignViewModelBuilder } from '../view-models/sign-view-model';
import SignPage from '../views/sign/sign-page';

export function signHandler(input: SignViewModelInput, next: NextFunction) {
    const api = createQueryApiClient<SignViewModel>();

    maxageSign(input.res);

    new SignViewModelBuilder(input, api)
        .build()
        .then(data => renderPage(input.res, <SignPage {...data} />))
        .catch(next);
}
