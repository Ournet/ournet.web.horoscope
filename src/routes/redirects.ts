
import { Router, Request, Response } from 'express';
import { RootModelBuilder, RootViewModel } from '../view-models/root-view-model';
import { createQueryApiClient } from '../data/api';
import { PlaceOldIdStringFields, PlaceOldId } from '@ournet/api-client';
import * as url from 'url';
import { maxageRedirect, maxage } from '../maxage';
import { getFavicon, getAppleFavicon } from '../config';
import logger from '../logger';

const route: Router = Router();

export default route;

route.get('/widget2', function (req, res) {
    const model = new RootModelBuilder({ req, res }).build() as RootViewModel;
    const { links, lang } = model;
    maxageRedirect(res);
    return res.redirect(301, links.weather.widget({ ul: lang }));
});

route.get('/alt-adsense-ads.html', function (_req, res) {
    maxageRedirect(res);
    return res.redirect(301, 'http://assets.ournetcdn.net/backup-ads/index.html');
});

route.get('/favicon.ico', function (req, res) {
    const model = new RootModelBuilder({ req, res }).build() as RootViewModel;
    maxage(res, 60 * 24 * 14);
    return res.redirect(301, getFavicon(model.config));
});

route.get('/apple-touch-icon.png', function (req, res) {
    const model = new RootModelBuilder({ req, res }).build() as RootViewModel;
    maxage(res, 60 * 24 * 14);
    return res.redirect(301, getAppleFavicon(model.config));
});

const ROUTE_PREFIX = ':prefix(prognoza|pogoda|vremea|forecast|tempo|pocasi|elorejelzes|mot)';

// /vremea/places -> /places
route.get('/' + ROUTE_PREFIX + '/places', function (req, res) {
    const model = new RootModelBuilder({ req, res }).build() as RootViewModel;
    const { lang, links } = model;

    maxageRedirect(res);

    res.redirect(301, links.weather.places({
        ul: lang
    }));
});

// /vremea/places/23 -> /places/23
route.get('/' + ROUTE_PREFIX + '/places/:adm1', function (req, res) {
    const model = new RootModelBuilder({ req, res }).build() as RootViewModel;
    const { lang, links } = model;

    maxageRedirect(res);

    res.redirect(301, links.weather.places.byAdm1(req.params.adm1, {
        ul: lang
    }));
});

// /vremea/12133 -> /12133
route.get('/' + ROUTE_PREFIX + '/:id(\\d+)', function (req, res) {
    const model = new RootModelBuilder({ req, res }).build() as RootViewModel;
    const { lang, links } = model;

    maxageRedirect(res);

    res.redirect(301, links.weather.place(req.params.id, {
        ul: lang
    }));
});

// /vremea/12133/10days -> /12133/10days
route.get('/' + ROUTE_PREFIX + '/:id(\\d+)/10days', function (req, res) {
    const model = new RootModelBuilder({ req, res }).build() as RootViewModel;
    const { lang, links } = model;

    maxageRedirect(res);

    res.redirect(301, links.weather.place(req.params.id, {
        ul: lang
    }));
});

// old place: /vremea/ro/Ciosescu/686675
route.get('/' + [ROUTE_PREFIX, ':country', ':name', ':id(\\d+)'].join('/'), async (req, res) => {

    const id = parseInt(req.params.id);
    const model = new RootModelBuilder({ req, res }).build() as RootViewModel;
    const { lang, links } = model;

    const oldIdResult = await createQueryApiClient<{ oldId: PlaceOldId }>().placesPlaceOldId('oldId', { fields: PlaceOldIdStringFields }, { id }).execute();

    if (!oldIdResult || !oldIdResult.data || !oldIdResult.data.oldId) {
        return res.redirect(links.weather.home({
            ul: lang
        }));
    }

    maxageRedirect(res);

    res.redirect(301, links.weather.place(oldIdResult.data.oldId.geonameid.toString(), {
        ul: lang
    }));
});

// old place: /vremea/ro/Cluj/Ciosescu/686675
route.get('/' + [ROUTE_PREFIX, ':country', ':name', ':name2', ':id(\\d+)'].join('/'), async (req, res) => {

    const id = parseInt(req.params.id);
    const model = new RootModelBuilder({ req, res }).build() as RootViewModel;
    const { lang, links } = model;

    const oldIdResult = await createQueryApiClient<{ oldId: PlaceOldId }>().placesPlaceOldId('oldId', { fields: PlaceOldIdStringFields }, { id }).execute();

    if (!oldIdResult || !oldIdResult.data || !oldIdResult.data.oldId) {
        return res.redirect(links.weather.home({
            ul: lang
        }));
    }

    maxageRedirect(res);

    res.redirect(301, links.weather.place(oldIdResult.data.oldId.geonameid.toString(), {
        ul: lang
    }));
});

route.get('/widget/WidgetScript', async (req, res) => {

    if (!req.query.id) {
        logger.error('Invalid widgetframe params', {
            url: req.originalUrl
        });
        return res.send('Invalid params!');
    }

    const id = parseInt(req.query.id);
    const model = new RootModelBuilder({ req, res }).build() as RootViewModel;
    const { lang, links } = model;

    const oldIdResult = await createQueryApiClient<{ oldId: PlaceOldId }>().placesPlaceOldId('oldId', { fields: PlaceOldIdStringFields }, { id }).execute();

    if (!oldIdResult || !oldIdResult.data || !oldIdResult.data.oldId) {
        return res.redirect(links.weather.home({
            ul: lang
        }));
    }

    maxageRedirect(res);

    res.redirect(301, links.weather.place(oldIdResult.data.oldId.geonameid.toString(), {
        ul: lang
    }));

    req.query.id = oldIdResult.data.oldId.geonameid;

    return res.redirect(301, links.weather.widget.widgetScript(req.query));
});

route.get('/widget/WidgetFrame', oldWidgetFrame);

route.get('/widget2/WidgetFrame', async (req, res) => {
    const id = req.query.id;
    const model = new RootModelBuilder({ req, res }).build() as RootViewModel;
    const { lang, links } = model;

    let query = req.query;

    maxageRedirect(res);

    if (!id) {
        let u = req.originalUrl.replace(/&amp;/g, '&');
        query = url.parse(u, true).query;
    }
    if (!query.id) {
        logger.error('Invalid widgetframe params', {
            url: req.originalUrl
        });
        return res.send('Invalid params!');
    }

    const oldIdResult = await createQueryApiClient<{ oldId: PlaceOldId }>().placesPlaceOldId('oldId', { fields: PlaceOldIdStringFields }, { id }).execute();

    if (!oldIdResult || !oldIdResult.data || !oldIdResult.data.oldId) {
        return res.redirect(links.weather.home({
            ul: lang
        }));
    }

    res.redirect(301, links.weather.place(oldIdResult.data.oldId.geonameid.toString(), {
        ul: lang
    }));

    req.query.id = oldIdResult.data.oldId.geonameid;

    return res.redirect(301, links.weather.widget2.widgetFrame(req.query));
});

route.get('/:prefix2/:namepath/widgetframe', oldWidgetFrame);

route.get('/:namepath/widget', function (req, res) {
    const model = new RootModelBuilder({ req, res }).build() as RootViewModel;
    const { links } = model;
    maxageRedirect(res);
    return res.redirect(301, links.weather.widget(req.query));
});

route.get('/resources/widgetframe', oldWidgetFrame);

async function oldWidgetFrame(req: Request, res: Response) {
    const id = req.query.id;
    const model = new RootModelBuilder({ req, res }).build() as RootViewModel;
    const { lang, links } = model;

    let query = req.query;

    maxageRedirect(res);

    if (!id) {
        let u = req.originalUrl.replace(/&amp;/g, '&');
        query = url.parse(u, true).query;
    }
    if (!query.id) {
        logger.error('Invalid widgetframe params', {
            url: req.originalUrl
        });
        return res.send('Invalid params!');
    }

    const oldIdResult = await createQueryApiClient<{ oldId: PlaceOldId }>().placesPlaceOldId('oldId', { fields: PlaceOldIdStringFields }, { id }).execute();

    if (!oldIdResult || !oldIdResult.data || !oldIdResult.data.oldId) {
        return res.redirect(links.weather.home({
            ul: lang
        }));
    }

    res.redirect(301, links.weather.place(oldIdResult.data.oldId.geonameid.toString(), {
        ul: lang
    }));

    req.query.id = oldIdResult.data.oldId.geonameid;

    return res.redirect(301, links.weather.widget.widgetFrame(req.query));
}
