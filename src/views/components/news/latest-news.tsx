
import * as React from 'react';
import GroupHeader from '../group-header';
import { LocalesNames } from '../../../locales-names';
import { getHost } from 'ournet.links';
import { WeatherViewModel } from '../../../view-models/horoscope-view-model';
import { ImageStorageHelper } from '@ournet/images-domain';

export default class LatestNews extends React.Component<WeatherViewModel> {
    render() {
        const { links, __, lang, country, latestNews } = this.props;
        if (!links.news || latestNews.length === 0) {
            return null;
        }

        const host = 'http://' + getHost('news', country);

        return (
            <div className='c-group c-latest-news'>
                <GroupHeader name={__(LocalesNames.latest_news)} link={host + links.news.home({ ul: lang })} />
                {latestNews.map(item => (
                    <a key={item.id} className='o-media o-media--small' href={host + links.news.event(item.slug, item.id, { ul: lang })}>
                        <img alt='' className='o-media__img' src={ImageStorageHelper.eventUrl(item.imageId, 'square', 'jpg')} />
                        <h6 className='o-media__body'>{item.title}</h6>
                    </a>
                ))}
            </div >
        )
    }
}
