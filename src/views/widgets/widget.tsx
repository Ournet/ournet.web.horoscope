
import * as React from 'react';
import PageTitle from '../components/page-title';
import { Share } from '../components/share';
import { WidgetViewModel } from '../../view-models/widget-view-model';
import RootLayout from '../root-layout';
import { LocalesNames } from '../../locales-names';
import WidgetConfigs from './components/widget-configs';
import Widget1Config from './components/widget1-config';
import env from '../../env';
import Widget2Config from './components/widget2-config';

export default class WidgetPage extends React.Component<WidgetViewModel> {
    render() {
        const props = this.props;
        const { __, lang, config, head } = props;

        return (
            <RootLayout {...props}>
                <main>
                    <div className='o-layout'>
                        <div className='o-layout__item u-2/5@tablet'>
                            <Share url={head.canonical} services={config.shareServices} lang={lang} align='right' />
                            <PageTitle title={head.title} subTitle={head.description} />
                            <div id='widget-configs'>
                                <input id='widget-config-type' type='hidden' defaultValue='widget' />
                                <WidgetConfigs previewSelector='#widget-iframe' scriptSelector='#widget-script' tabs={{ widget: 'Widget 1', widget2: 'Widget 2' }} selected={0} contents={[<Widget1Config {...this.props} />, <Widget2Config {...this.props} />]} />
                            </div>
                            <br />
                            <Share url={head.canonical} services={config.shareServices} lang={lang} />
                            <br />
                            <br />
                        </div>
                        <div className='o-layout__item u-3/5@tablet'>
                            <div id='widget-preview'>
                                <h3>{__(LocalesNames.preview)}</h3>
                                <br />
                                <div id='widget-iframe'></div>
                                <br />
                                <h3>{__(LocalesNames.html_code)}</h3>
                                <textarea id="widget-script"></textarea>
                            </div>
                        </div>
                    </div>
                </main>
                {env.isProduction
                    ? <link type="text/css" rel="stylesheet" href={`//assets.ournetcdn.net/ournet/css/weather/page-widget-${config.assets.css.pageWidget}.css`} />
                    : <link type="text/css" rel="stylesheet" href={`http://localhost:8080/css/weather/page-widget.css`} />
                }
                {env.isProduction
                    ? <script async={true} src={`//assets.ournetcdn.net/ournet/css/weather/page-widget-${config.assets.js.pageWidget}.js`} />
                    : <script async={true} src={`http://localhost:8080/js/weather/page-widget.js`} />
                }
            </RootLayout>
        )
    }
}
