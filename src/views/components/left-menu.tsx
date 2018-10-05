
import * as React from 'react';
import { RootViewModel } from '../../view-models/root-view-model';
import { Place } from '@ournet/api-client';
import { LocalesNames } from '../../locales-names';
import { format } from 'util';
import { PlaceHelper } from '../../data/places/place-helper';

export type LeftMenuComponentProps = {
    root: RootViewModel
    canonical?: string
    places: Place[]
}

export default class LeftMenuComponent extends React.Component<LeftMenuComponentProps> {
    render() {
        const { places, canonical } = this.props;
        const { __, links, country, lang, config } = this.props.root;

        const ulParam = { ul: lang };

        return (
            <div className="c-group">
                <h4 className="c-group__title">
                    <a href={links.weather.home({ ul: lang })}>
                        {__(`country_${country}`)}
                    </a>
                </h4>
                <div className="c-group__content c-main-menu">
                    {places.map(item => {
                        const link = links.weather.place(item.id, ulParam);
                        return <a key={item.id} href={link} className={link === canonical ? 'active' : undefined}>{PlaceHelper.getName(item, lang)}</a>
                    })}
                    <a href={links.weather.places(ulParam)} className={links.weather.places(ulParam) === canonical ? 'active' : undefined}>
                        {format(__(LocalesNames.other_n_places_format), config.placesCount)}
                    </a>
                </div>
            </div>
        );
    }
}
