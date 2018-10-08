
import * as React from 'react';
import { RootViewModel } from '../../../view-models/root-view-model';

export default class HeaderLogoComponent extends React.Component<RootViewModel> {
    render() {
        const { config, links, lang, __ } = this.props;

        return (
            <div className='c-logo'>
                <a className='c-logo__img' href={links.weather.home({ ul: lang })} title={config.name} />
            </div>
        )
    }
}
