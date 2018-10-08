import * as React from 'react';
import { HoroscopeViewModel } from '../view-models/horoscope-view-model';
import RootLayout from './root-layout';
import env from '../env';
import LatestNews from './components/news/latest-news';

export default class CommonLayout extends React.Component<HoroscopeViewModel> {
    render() {
        const { config } = this.props;

        return (
            <RootLayout {...this.props}>
                <div className="o-layout">
                    <div className="o-layout__item u-4/6@tablet">
                        {this.props.children}
                    </div>
                    <div className="o-layout__item u-2/6@tablet">
                        <LatestNews {...this.props} />
                        <div className='c-ad'>
                            <ins className='adsbygoogle' style={{ display: 'block' }} data-ad-client='ca-pub-3959589883092051' data-ad-slot='1115823833' data-ad-format='auto'></ins>
                            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
                        </div>
                    </div>
                </div>
                {env.isProduction ?
                    <script key='3' async={true} src={`//assets.ournetcdn.net/ournet/css/${config.project}/main-${config.assets.js.main}.js`} />
                    : <script key='4' async={true} src={`http://localhost:8080/js/${config.project}/main.js`} />
                }
            </RootLayout>
        )
    }
}
