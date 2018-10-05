
import { PageViewModelInput, PageViewModel, PageViewModelBuilder } from "./page-view-model";
import { Place, DailyForecastDataBlock, ForecastReportStringFields, ForecastReport } from "@ournet/api-client";
import { createQueryApiClient } from "../data/api";
import { PlaceNoAdmin1Fields } from "../data/common";
import { notFound } from "boom";
import { isNullOrEmpty } from "../utils";
import { Request, Response } from "express";
const chroma = require('chroma-js');

export interface Widget2ViewModelInput extends PageViewModelInput {
    id: string
    days: number
    w: number
    color?: string
    itemcolor?: string
    textcolor?: string
    pos: 'h' | 'v'
    header: boolean
}

export interface Widget2ViewModel extends PageViewModel {
    place: Place
    forecast: ForecastReport
    report: DailyForecastDataBlock
    widget: Widget2ViewModelInfo
}

export type Widget2ViewModelInfo = {
    w: number
    header: boolean
    pos: 'h' | 'v'
    days: number
    headerHeight: number
    itemMarginBottom: number
    bodyPaddingTop: number
    bodyPaddingBottom: number
    itemHeight: number
    showInfo: boolean
    itemBorderColor: string
    color: string
    textColor: string
    itemColor: string
    itemColorDark: string
    itemColorLighter: string
    itemColorLight: string

    dateWidth: string
    imageWidth: string
    tempWidth: string
    infoWidth: string
    iframeHeight: number
}

export class Widget2ViewModelBuilder extends PageViewModelBuilder<Widget2ViewModel, Widget2ViewModelInput> {

    async build() {

        this.model.widget = Widget2ViewModelBuilder.createWidgetInfo(this.input);


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

    protected formatModel(data: Widget2ViewModel) {
        const { forecast } = data;
        if (forecast.daily) {
            this.model.report = forecast.daily
        }

        return super.formatModel(data);
    }

    static createWidgetInfo(input: Widget2ViewModelInput) {
        const { pos, header } = input;
        let { days, w } = input;

        if (isNaN(days) || days < 1 || days > 9) {
            days = 5;
        }
        if (isNaN(w) || w < 50) {
            w = 200;
        }

        const headerHeight = 40;
        const itemMarginBottom = 3;
        const bodyPaddingTop = 5;
        const bodyPaddingBottom = 6;
        const itemHeight = input.pos === 'h' ? 58 : 178;
        const showInfo = input.pos === 'v' || input.w > 250;

        const LAB_CONSTANTS = 18;

        const color = chroma(input.color);
        const colorDark = color.darken(10 / LAB_CONSTANTS).hex();
        const colorDarker = color.darken(20 / LAB_CONSTANTS).hex();
        const colorLight = color.brighten(10 / LAB_CONSTANTS).hex();
        const colorLighter = color.brighten(16 / LAB_CONSTANTS).hex();
        let textColor = color.darken(22 / LAB_CONSTANTS).brighten(90 / LAB_CONSTANTS).hex();
        let itemColor = colorDark;
        let itemColorDark = colorDarker;
        let itemColorLighter = colorLighter;
        let itemColorLight = colorLight;
        if (!isNullOrEmpty(input.textcolor)) {
            textColor = chroma(input.textcolor).hex();
        }
        if (!isNullOrEmpty(input.itemcolor)) {
            const ic = chroma(input.itemcolor);
            itemColor = ic.hex();
            itemColorDark = ic.darken(10 / LAB_CONSTANTS).hex();
            itemColorLighter = ic.brighten(16 / LAB_CONSTANTS).hex();
            itemColorLight = ic.brighten(10 / LAB_CONSTANTS).hex();
        }

        const itemBorderColor = itemColorLighter;

        let dateWidth = showInfo ? '20%' : '30%';
        let imageWidth = showInfo ? '20%' : '30%';
        let tempWidth = showInfo ? '25%' : '40%';
        let infoWidth = showInfo ? '35%' : '30%';
        if (pos === 'v') {
            dateWidth = '22%';
            imageWidth = '30%';
            tempWidth = '23%';
            infoWidth = '25%';
        }

        let iframeHeight: number;
        if (pos === 'h') {
            iframeHeight = ((input.header ? headerHeight + 1 : 0) + days * (itemHeight) + days - 1 +
                (days - 1) * itemMarginBottom +
                bodyPaddingBottom + bodyPaddingTop);
        } else {
            iframeHeight = ((header === true ? headerHeight + 1 : 0) + (itemHeight) + days - 1 + bodyPaddingBottom + bodyPaddingTop);
        }

        const info: Widget2ViewModelInfo = {
            color: color.hex(),
            w,
            header,
            pos,
            days,
            itemHeight,
            bodyPaddingTop,
            itemColorLighter,
            dateWidth,
            itemColorDark,
            headerHeight,
            textColor,
            tempWidth,
            showInfo,
            itemMarginBottom,
            itemColorLight,
            itemColor,
            itemBorderColor,
            infoWidth,
            imageWidth,
            iframeHeight,
            bodyPaddingBottom,
        };

        return info;
    }

    static inputFromRequest(req: Request, res: Response) {
        const query = req.query;

        const input: Widget2ViewModelInput = {
            req, res,
            color: query.color || '68a7d4',
            days: parseInt(query.days),
            w: parseInt(query.w),
            header: ['true', 'on', 'True', '1'].includes(query.header),
            id: query.id,
            itemcolor: query.itemcolor,
            pos: query.pos as 'h' | 'v' || 'v',
            textcolor: query.textcolor,
        };

        return input;
    }
}
