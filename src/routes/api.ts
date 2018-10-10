
import { Router, Response } from 'express';
import { apiHandler } from '../controllers/api-controller';
import { maxage } from '../maxage';
import logger from '../logger';
import { RootModelBuilder, RootViewModel } from '../view-models/root-view-model';
import * as moment from "moment-timezone";
import { createQueryApiClient } from '../data/api';
import { HoroscopeReport, HoroscopeReportStringFields } from '@ournet/api-client';
import { HoroscopesHelper, HoroscopeSign } from '../../../../packages/horoscopes-domain/lib';

const route: Router = Router();

export default route;

//api
route.get('/api', (req, res, next) =>
    apiHandler({ req, res }, next));

route.get('/api/reports.json', async (req, res) => {

    const model = new RootModelBuilder({ req, res }).build() as RootViewModel;

    const { config, lang } = model;

    const currentDate = moment().tz(config.timezone).locale(lang);

    const period = req.query.period || ('D' + currentDate.format('YYYYMMDD'));

    if (typeof period !== 'string' || !/^[WD]\d+$/.test(period)) {
        return sendData(res, null, { message: `Param 'period' is invalid. Example: D20171018` }, 400);
    }

    let clientId = req.query.client as string;

    if (!clientId) {
        return sendData(res, null, { message: `Invalid 'client' query string value` }, 400);
    }

    clientId = clientId.trim();

    logger.warn(`clientId=${clientId}`, { clientId: clientId, period: period });

    const api = createQueryApiClient<{ reports: HoroscopeReport[] }>();

    const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(sign => HoroscopesHelper.createReportId(period, lang, sign as HoroscopeSign));

    try {
        const reports = (await api.horoscopesReportsByIds('reports', { fields: 'id period text sign numbers stats {health love success}' }, { ids })
            .execute()).data.reports;
        sendData(res, { period, reports });
    } catch (e) {
        return sendData(res, { clientId: clientId, period: period }, e);
    }
})

route.get('/api/daily-reports.json', (req, res) => {
    if (req.query.date) {
        req.query.period = 'D' + req.query.date;
    }
    // delete req.query.date;
    res.redirect(301, '/api/reports.json?client=' + encodeURIComponent(req.query.client || '') + '&period=' + encodeURIComponent(req.query.period || ''));
})

function sendData(res: Response, data: any, error?: any, statusCode?: number) {
    maxage(res, 60);

    if (error) {
        statusCode = statusCode || error.statusCode || 500;
        if (statusCode && statusCode >= 500) {
            maxage(res, 5);
        }

        logger.error(error, { statusCode: statusCode });

        res.status(statusCode || 500);

        return res.send({ error: { message: error.message } });
    }
    res.send({ data: data });
}
