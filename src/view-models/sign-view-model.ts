
import { HoroscopeViewModel, HoroscopeViewModelBuilder } from "./horoscope-view-model";
import { PageViewModelInput } from "./page-view-model";
import { LocalesNames } from "../locales-names";
import * as util from 'util';
import { HoroscopeReport, HoroscopeReportStringFields } from "@ournet/api-client";
import { HoroscopesHelper, HoroscopeSign } from "@ournet/horoscopes-domain";
import { notFound } from "boom";

export interface SignViewModelInput extends PageViewModelInput {
    slug: string
}

export interface SignViewModel extends HoroscopeViewModel {
    report: HoroscopeReport
}

export class SignViewModelBuilder extends HoroscopeViewModelBuilder<SignViewModel, SignViewModelInput> {

    build() {

        const { lang, links, __, head, currentDayPeriodText, currentDayPeriod } = this.model;

        const sign = getSignBySlug(this.input.slug, lang);

        head.title = util.format(__(LocalesNames.sign_daily_title_format), sign.name);
        head.description = util.format(__(LocalesNames.sign_daily_details_format), sign.name, currentDayPeriodText);

        this.setCanonical(links.horoscope.sign(sign.slug, { ul: lang }));

        const id = HoroscopesHelper.createReportId(currentDayPeriod, lang, sign.id);

        this.api.horoscopesReportById('report', { fields: HoroscopeReportStringFields }, { id });

        return super.build();
    }

    protected formatModel(data: SignViewModel) {
        this.model.report = data.report;

        return super.formatModel(data);
    }
}

function getSignBySlug(slug: string, lang: string): { id: HoroscopeSign, name: string, slug: string } {
    for (let i = 1; i <= 12; i++) {
        const sign = HoroscopesHelper.getSignName(i as HoroscopeSign, lang);
        if (sign) {
            return { ...sign, id: (i as HoroscopeSign) };
        }
    }
    throw notFound(`Not found sign ${slug}`);
}
