
import * as React from 'react';
import Logo from './logo';
import { HoroscopeViewModel } from '../../../view-models/horoscope-view-model';
import CapitalForecast from './capital-forecast';
import { getHost } from 'ournet.links';
import { LocalesHelper } from '../../../locales-names';

export default class HeaderComponent extends React.Component<HoroscopeViewModel> {
    render() {
        const { capital, capitalForecast, config, __, country } = this.props;
        const placeForecast = capital && capitalForecast
            ? <CapitalForecast root={this.props} place={capital} forecast={capitalForecast} />
            : null;
        return (
            <header className='c-header o-layout o-layout--small'>
                <div className='o-layout__item u-2/6 u-1/6@tablet'>
                    <Logo {...this.props} />
                </div>
                <div className='o-layout__item u-4/6 u-3/6@tablet'>
                    <ul className='c-menu'>
                        {config.projects.slice(0,3).map(project => <li key={project}><a className={project === config.project ? 'c-menu--selected' : ''} href={'http://' + getHost(project, country)}>{LocalesHelper.getProjectName(__, project)}</a></li>)}
                    </ul>
                </div>
                <div className='o-layout__item u-2/6@tablet u-hide-mobile u-tr'>
                    {placeForecast}
                </div>
            </header>
        )
    }
}
