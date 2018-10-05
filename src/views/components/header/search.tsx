
import * as React from 'react';
import { LocalesNames } from '../../../locales-names';
import { RootViewModel } from '../../../view-models/root-view-model';

export default class HeaderSearchComponent extends React.Component<RootViewModel> {
    render() {
        const { links, __, lang } = this.props;
        return (
            <form method='get' className='c-search' action={links.weather.search({ ul: lang })}>
                <input type='text' name='q' className='c-search__input' placeholder={__(LocalesNames.search_text)} />
                <button type='submit' className='c-search__btn' />
            </form>
        )
    }
}
