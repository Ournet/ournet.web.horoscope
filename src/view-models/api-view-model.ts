
import { HoroscopeViewModel, HoroscopeViewModelBuilder } from "./horoscope-view-model";
import { PageViewModelInput } from "./page-view-model";
import { LocalesNames } from "../locales-names";
import * as util from 'util';
import { Dictionary } from "../../../../packages/domain/lib";
import { getSchema, getHost } from "ournet.links";

export interface ApiViewModel extends HoroscopeViewModel {
    bodyHtml: string
}

export class ApiViewModelBuilder extends HoroscopeViewModelBuilder<ApiViewModel, PageViewModelInput> {
    build() {
        const { links, lang, __, head, config, project, country, currentDate } = this.model;

        this.setCanonical(links.horoscope.sign('api', { ul: lang }));

        const variables = {
            project: config.domain.substr(0, 1).toUpperCase() + config.domain.substr(1),
            schema: getSchema(project, country),
            host: getHost(project, country),
            currentDate: currentDate.format('YYYYMMDD')
        };

        this.model.title = head.title = __(LocalesNames.api_title);
        head.title += ' - ' + variables.project;
        this.model.subTitle = head.description = util.format(__(LocalesNames.api_subtitle), variables.project);

        this.model.bodyHtml = replaceVariables(__(LocalesNames.api_body), variables);

        return super.build();
    }
}

function replaceVariables(text: string, vars: Dictionary<string>) {
    for (const prop in vars) {
        const val = vars[prop];
        text = text.replace(new RegExp('\\$\\{' + prop + '\\}', 'g'), val);
    }

    return text;
}
