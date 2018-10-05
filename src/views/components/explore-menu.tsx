
import * as React from 'react';
import { RootViewModel } from '../../view-models/root-view-model';
import { Place } from '@ournet/api-client';
import { LocalesNames, LocalesHelper } from '../../locales-names';
import { format } from 'util';
import { PlaceHelper } from '../../data/places/place-helper';

export type ExploreMenuComponentProps = {
    root: RootViewModel
    canonical?: string
    places: Place[]
}

export default class ExploreMenuComponent extends React.Component<ExploreMenuComponentProps> {
    render() {
        const { places } = this.props;
        const { __, links, country, lang, config } = this.props.root;

        const ulParam = { ul: lang };

        return (
            <div className="c-exp">
                <h4 className="c-exp__title">
                    <a href={links.weather.home({ ul: lang })}>
                        {LocalesHelper.getCountryName(__, country)}
                    </a>
                </h4>
                <ul className="c-exp-list">
                    {places.map(item => {
                        const link = links.weather.place(item.id, ulParam);
                        return <li key={item.id}><a href={link}>{PlaceHelper.getName(item, lang)}</a></li>
                    })}
                    <li key='places-count'>
                        <a href={links.weather.places(ulParam)}>
                            {format(__(LocalesNames.other_n_places_format), config.placesCount)}
                        </a>
                    </li>
                </ul>
                {
                    config.lists && config.lists.map(list => (
                        <h5 key={list.id} className="c-exp__title">
                            <a href={links.weather.place(list.id, { ul: lang })}>
                                {list.name[lang]} ›
                            </a>
                        </h5>
                    ))
                }
            </div>
        );
    }
}
