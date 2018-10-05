
import { Router } from 'express';
import { RootModelBuilder, RootViewModel } from '../view-models/root-view-model';
import { createQueryApiClient } from '../data/api';
import { Place, PlaceStringFields } from '@ournet/api-client';
import { placesDailyForecastHandler } from '../controllers/places-controller';
import { PlaceHelper } from '../data/places/place-helper';
import { atonic } from '@ournet/domain';
import { maxage } from '../maxage';

const route: Router = Router();

export default route;

route.get('/controls/places-daily-forecast/:date(\\d{4}-\\d{2}-\\d{2})/:ids', (req, res, next) =>
    placesDailyForecastHandler({ req, res, date: req.params.date, ids: req.params.ids.split(',') }, next));

route.get('/controls/findplace', async (req, res) => {
    let q = req.query.q;

    maxage(res, 60 * 24 * 7); // 7 days

    if (!q || q.trim().length < 3) {
        return res.send([]);
    }
    const model = new RootModelBuilder({ req, res }).build() as RootViewModel;
    const { country, lang } = model;

    if (['ro'].includes(lang)) {
        q = atonic(q);
    }

    const api = createQueryApiClient<{ places: Place[] }>();
    const placesResult = await api.placesSearchPlace("places",
        { fields: PlaceStringFields },
        { query: q.trim(), country, limit: 10, type: 'phrase_prefix' })
        .execute();

    if (!placesResult || !placesResult.data) {
        return res.send([]);
    }

    const places = (placesResult.data.places || []).filter(item => item.featureClass !== 'A');

    return res.send((places).map(place => ({ id: place.id, name: PlaceHelper.getName(place, lang), admin: place.admin1 && PlaceHelper.getName(place.admin1, lang) })));
});
