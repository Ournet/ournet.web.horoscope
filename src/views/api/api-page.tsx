import * as React from 'react';
import CommonLayout from '../common-layout';
import PageTitle from '../components/page-title';
import { Share } from '../components/share';
import { ApiViewModel } from '../../view-models/api-view-model';
import facebookScript from '../components/facebook-script';

export default class ApiPage extends React.Component<ApiViewModel> {
    render() {
        const { lang, head, __, config, title, subTitle, bodyHtml, country } = this.props;

        return (
            <CommonLayout {...this.props}>
                <main>
                    <Share services={config.shareServices} align='right' url={head.canonical} lang={lang} />
                    <PageTitle title={title || head.title} subTitle={subTitle || head.description} />
                    <div className='c-api-doc' dangerouslySetInnerHTML={{ __html: bodyHtml }}></div>
                    <br />
                    <div className='fb-comments' data-href={head.canonical} data-numposts="5" data-width="100%"></div>
                    <br />
                </main>
                {facebookScript(config.facebookId, lang, country)}
            </CommonLayout>
        )
    }
}