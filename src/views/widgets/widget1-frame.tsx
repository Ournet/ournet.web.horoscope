import * as React from 'react';
import { Widget1ViewModel } from '../../view-models/widget1-view-model';
import { PlaceHelper } from '../../data/places/place-helper';
import * as util from 'util';
import { LocalesNames } from '../../locales-names';
import { ForecastHelper } from '@ournet/weather-domain';
import * as moment from 'moment-timezone';

export default class Widget1Frame extends React.Component<Widget1ViewModel> {
    render() {

        const { lang, textcolor, lcolor } = this.props;

        const widget = this.formatWidget();

        return (
            <html lang={lang}>
                <head>
                    <title>Widget1</title>
                    <style type="text/css" dangerouslySetInnerHTML={{
                        __html: `body{font-size:.75em;font-family:Arial, Helvetica, Sans-Serif;margin:0;padding:0;color:#${textcolor};}
.head{padding:5px 6px;font-size:110%;font-weight:bold;white-space:nowrap;}
a{text-decoration:none;}
a:active{color:#ca0000;}
.day{width:25%;}
.day .name{font-weight:bold;text-align:center;}
.day .date{font-size:90%;margin-top:4px;text-align:center;}
.icon{width:25%;position: relative;overflow: hidden;}
.details .temp{text-align:center;font-size:110%;}
.details .name{font-size:90%;margin-top:4px;text-align:center;white-space:nowrap;}
.line{padding:3px 0px;height:36px;overflow: hidden;border-bottom:1px solid #${lcolor};}
.line:last-child{border-bottom:none;}
td{overflow:hidden}
.w-icon {width: 32px;height: 32px;display: inline-block;background-image: url('//assets.ournetcdn.net/root/img/icons/weather/40-weather-icons-wb.png');background-position: 0px 0px;background-repeat: no-repeat;
-webkit-background-size: cover;-moz-background-size: cover;-o-background-size: cover;background-size: cover;}
.w-icon.night {background-image: url('//assets.ournetcdn.net/root/img/icons/weather/40-weather-icons-night-wb.png');}
.w-icon.wi-2 {background-position: -32px 0;}
.w-icon.wi-3 {background-position: -64px 0;}
.w-icon.wi-4 {background-position: -96px 0;}
.w-icon.wi-5 {background-position: -128px 0;}
.w-icon.wi-6 {background-position: -160px 0;}
.w-icon.wi-7 {background-position: -192px 0;}
.w-icon.wi-8 {background-position: -224px 0;}
.w-icon.wi-9 {background-position: -256px 0;}
.w-icon.wi-10 {background-position: -288px 0;}
.w-icon.wi-11 {background-position: -320px 0;}
.w-icon.wi-12 {background-position: -352px 0;}
.w-icon.wi-13 {background-position: -384px 0;}
.w-icon.wi-14 {background-position: -416px 0;}
.w-icon.wi-15 {background-position: -448px 0;}`}}></style>
                </head>
                <body dangerouslySetInnerHTML={{ __html: widget }}></body>
            </html >
        )
    }

    formatWidget() {
        const { place, lang, links, w, __, days, htcolor, report, bcolor, bkcolor, hbkcolor } = this.props;
        const id = place.id;
        const placename = PlaceHelper.getName(place, lang);
        const longtitle = util.format(__(LocalesNames.weather_in_format), placename);
        let title = longtitle;

        const url = links.weather.place(id, {
            utm_campaign: 'widget',
            utm_source: 'widget',
            utm_medium: 'iframe',
            ul: lang
        }).replace(/&/g, '&amp;');

        if (w < 190) {
            title = placename;
        }

        const name = '<a target="_blank" style="color:#' + htcolor + ';" href="' + url + '" title="' + longtitle + '">' + title + '</a>';

        let body = '';

        for (var i = 0; i < days && i < report.data.length; i++) {
            const day = report.data[i],
                symbolName = ForecastHelper.iconName(day.icon, lang),
                temperature = Math.round(day.temperatureHigh || day.temperature) + '&deg; | ' + Math.round(day.temperatureLow || day.temperature) + '&deg;',
                date = moment(new Date(day.time * 1000)).tz(place.timezone).locale(lang);

            const line = '<div class="line"><table width="100%" border="0" cellspacing="0"><tr><td class="day"><div class="name">' + date.format('dd') + '</div><div class="date">' + date.format('D MMM') + '</div></td><td class="icon"><span class="w-icon wi-' + day.icon + '" title="' + symbolName + '"></span></td><td class="details"><div class="temp">' + temperature + '</div><div class="name" title="' + symbolName + '">' + symbolName + '</div></td></tr></table></div>';
            body += line;
        }

        var headstyle = 'border:1px solid #' + bcolor + ';background:#' + hbkcolor;
        var bodystyle = 'cursor:pointer;border:1px solid #' + bcolor + ';border-top:0px;background:#' + bkcolor;

        return util.format('<div id="widget"><div class="head" style="%s">%s</div><div onclick="window.open(\'%s\', \'_blank\');" class="body" style="%s">%s</div></div>', headstyle, name, url, bodystyle, body);
    }
}
