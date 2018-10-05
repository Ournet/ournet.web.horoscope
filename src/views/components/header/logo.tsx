
import * as React from 'react';
import { RootViewModel } from '../../../view-models/root-view-model';
import { getHost } from 'ournet.links';
import { LocalesNames } from '../../../locales-names';

export default class HeaderLogoComponent extends React.Component<RootViewModel> {
    render() {
        const { config, links, lang, __, country } = this.props;
        const portal = config.projects.length > 1;
        if (portal) {
            return (
                <div className='c-logo c-logo--proj'>
                    <a className='c-logo__img' href={'http://' + getHost('portal', country) + links.portal.home({ ul: lang })} title={config.name} />
                    <a className='c-logo__proj' href={links.weather.home({ ul: lang })} title={__(LocalesNames.weather)}>{__(LocalesNames.project_name)}</a>
                </div>
            )
        }
        return (
            <div className='c-logo'>
                <a className='c-logo__img' href={links.weather.home({ ul: lang })} title={config.name} />
            </div>
        )
    }
}
