
import * as React from 'react';
import { PlaceHelper } from '../../data/places/place-helper';
import { LocalesNames } from '../../locales-names';
import Breadcrumb, { BreadcrumbViewData } from '../components/breadcrumb';
import PageTitle from '../components/page-title';
import * as util from 'util';
import PlacesList from './components/places-list';
import { PlacesViewModel } from '../../view-models/places-view-model';
import CommonLayout from '../common-layout';


export default class PlacesPage extends React.Component<PlacesViewModel> {
    render() {
        const props = this.props;
        const { __, lang, country, links, places, placesAdmin1, head } = props;
        const localeParams = { ul: lang };
        let title = util.format(__(LocalesNames.search_place_in_cn),
            PlaceHelper.inCountryName(__('country_' + country), lang));

        const breadcrumbData: BreadcrumbViewData = {
            items: [
                { text: __(LocalesNames.weather), url: links.weather.home(localeParams) },
                { text: __(LocalesNames.places), url: links.weather.places(localeParams) },
            ]
        };

        if (placesAdmin1) {
            breadcrumbData.items.push({
                text: PlaceHelper.getName(placesAdmin1, lang),
                url: links.weather.places.byAdm1(placesAdmin1.admin1Code, localeParams)
            })

            title = util.format(__(LocalesNames.search_place_in_cn_format),
                PlaceHelper.getName(placesAdmin1, lang), __('country_' + country));
        }

        head.title = title;

        return (
            <CommonLayout {...props}>
                <main>
                    <Breadcrumb {...breadcrumbData} />
                    <PageTitle title={title} />
                    {places.length === 0
                        ? <div className='c-nodata'>{__(LocalesNames.not_found_places)}</div>
                        : <PlacesList root={props} places={places} />}
                </main>
            </CommonLayout>
        )
    }
}
