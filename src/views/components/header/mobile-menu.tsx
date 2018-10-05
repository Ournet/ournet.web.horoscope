
import * as React from 'react';
import { RootViewModel } from '../../../view-models/root-view-model';

export default class MobileMenuComponent extends React.Component<RootViewModel> {
    render() {
        // const { config, links, lang, __, country } = this.props;

        return (
            <div className='c-mobm u-mobile-only' data-ref='.c-exp'>
                <div className='c-mobm__overlay u-hidden'></div>
                <div className='c-mobm__btn'>
                    <i className="c-mobm__btn-i"></i>
                    <button className="c-mobm__btn-btn"></button>
                </div>
                <div className="c-mobm__menu u-hidden">
                    <div className="c-mobm__close">
                        <span className="c-mobm__close-l"></span>
                        <span className="c-mobm__close-l"></span>
                        <button className="c-mobm__close-btn">Close Menu</button>
                    </div>
                    <div className="c-mobm__menu-content">
                        <div className="c-mobm__ins">

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
