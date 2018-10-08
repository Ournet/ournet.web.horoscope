
import * as React from 'react';
import PageHead from './components/page-head';
import { HoroscopeViewModel } from '../view-models/horoscope-view-model';
import Header from './components/header/header';
import PageFooter from './components/page-footer';
import AccentLine from './components/accent-line';

export default class RootLayout extends React.Component<HoroscopeViewModel, any> {
    render() {
        const { lang, children, country, config } = this.props;

        return (
            <html lang={lang}>
                <AccentLine />
                <PageHead {...this.props} />
                <body className={`proj-${config.project} country-${country}`}>
                    <div className='o-wrapper'>
                        <Header {...this.props} />
                        {children}
                    </div>
                    <PageFooter {...this.props} />
                    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                </body>
            </html>
        )
    }
}
