import * as React from 'react';
import { PlaceHelper } from '../../data/places/place-helper';
import * as util from 'util';
import { LocalesNames } from '../../locales-names';
import { ForecastHelper } from '@ournet/weather-domain';
import * as moment from 'moment-timezone';
import { Widget2ViewModel } from '../../view-models/widget2-view-model';

export default class Widget2Frame extends React.Component<Widget2ViewModel> {
    render() {

        const { lang, widget: info } = this.props;

        const widget = this.formatWidget();

        return (
            <html lang={lang}>
                <head>
                    <title>Widget2</title>
                    <style type="text/css" dangerouslySetInnerHTML={{
                        __html: `*,*:before,*:after{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}
body{background-color:transparent;font-size:.75em;font-family:Arial, Helvetica, Sans-Serif;margin:0;padding:0;color:#848484;}
#widget{background: ${info.color};color:${info.textColor};text-shadow: 1px 1px 3px ${info.itemColorDark};}
#header{background:${info.itemColorDark};border-bottom:1px solid ${info.itemColorDark};height: ${info.headerHeight}px;overflow: hidden;}
#header .inner{ padding: 5px 8px;overflow: hidden;}
#header a{ text-decoration: none;}
#header .title{line-height: 30px;font-size: 20px;color:${info.textColor};}
#header .date{ line-height: 12px;font-size: 11px;}
#header .caret{position: absolute;right: 8px;top: 17px;width: 0;height: 0;border-left: 8px solid transparent;border-right: 8px solid transparent;border-top: 8px solid ${info.itemBorderColor};}
#body{padding: 4px 4px 7px 4px;}
.table{width: 100%;}
.table .item{height: ${info.itemHeight}px;}
.in-table{background:${info.itemColor};cursor: pointer;overflow: hidden;border-top: 1px solid ${info.itemColorLight};display: block;margin: 3px;padding: 0px;}
.in-table:hover{background-color:${info.itemColorDark};-webkit-transition: background-color 0.2s linear;-moz-transition: background-color 0.2s linear;-o-transition: background-color 0.2s linear;-ms-transition: background-color 0.2s linear;transition: background-color 0.2s linear;}
/*      content     */
.table .item .inner{ padding: 5px;overflow: hidden;}
.table .date span{ white-space: nowrap;}
.table .temp{ text-transform: lowercase;font-weight: bold;white-space: nowrap;}
.position-h .table .item li{ float: left;display: inline-block;height: 100%;vertical-align: central;}
.position-h .table .item{ text-align: center;}
.position-h .table .date{ width: ${info.dateWidth};}
.position-h .table .date span{ display: block;}
.position-h .table .date span.day-name{ font-weight: bold;}
.position-h .table .image{ width: ${info.imageWidth};}
.position-h .table .temp{ width: ${info.tempWidth};}
.position-h .table .info{ width: ${info.infoWidth};}
.position-h .info .inner,.position-h .temp .inner,.position-h .date .inner {padding-top: 15%;height: 100%;}
ul,li{ margin: 0px;padding: 0px;list-style: none;}
.table ul{ height: 100%;}
ul ul li{ overflow: hidden;}
.position-v .table{ height: ${info.itemHeight+2}px;overflow: hidden;}
.position-v li li{ display: block;float: none;text-align: center;vertical-align: middle;}
.position-v .table .item{float: left;min-width: 60px;width:${(100/info.days)}%}
.position-v .table .date{ height:${info.dateWidth};}
.position-v .table .date span{ display: block;}
.position-v .table .date span.day-name{ font-weight: bold;}
.position-v .table .image{ height: ${info.imageWidth};}
.position-v .table .temp{ height: ${info.tempWidth};}
.position-v .table .info{ height: ${info.infoWidth};background-color: ${info.itemColorDark};}
.w-icon {width:40px;height:40px;display: inline-block;background-image:url('//assets.ournetcdn.net/root/img/icons/weather/40-weather-icons-wb.png');background-position: 0px 0px;background-repeat: no-repeat;}
.w-icon.night {background-image:url('//assets.ournetcdn.net/root/img/icons/weather/40-weather-icons-night-wb.png');}

.wi-2 {
    background-position: -40px 0;
}
.wi-3 {
    background-position: -80px 0;
}
.wi-4 {
    background-position: -120px 0;
}
.wi-5,
.wi-9,
.wi-22 {
    background-position: -160px 0;
}
.wi-6 {
    background-position: -200px 0;
}
.wi-7,
.wi-20,
.wi-24,
.wi-23,
.wi-26,
.wi-30,
.wi-31,
.wi-40,
.wi-42,
.wi-46,
.wi-47 {
    background-position: -240px 0;
}
.wi-8,
.wi-21,
.wi-28,
.wi-33,
.wi-44,
.wi-49 {
    background-position: -280px 0;
}
.wi-10,
.wi-25,
.wi-41 {
    background-position: -360px 0;
}
.wi-11 {
    background-position: -400px 0;
}
.wi-12,
.wi-27,
.wi-32,
.wi-43,
.wi-48 {
    background-position: -440px 0;
}
.wi-13,
.wi-29,
.wi-45,
.wi-50 {
    background-position: -480px 0;
}
.wi-14,
.wi-34 {
    background-position: -520px 0;
}
.wi-15 {
    background-position: -560px 0;
}`}}></style>
                </head>
                <body dangerouslySetInnerHTML={{ __html: widget }}></body>
            </html >
        )
    }

    formatWidget() {
        const { place, lang, links, __, report } = this.props;
        const { pos, w, header, showInfo, days } = this.props.widget;
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

        if (w < 300) {
            title = placename;
        }

        var body = ['<div id="widget" class="position-' + pos + '">'];

        if (header) {
            body.push('<div id="header"><div class="inner">');
            body.push('<a href="' + url + '" target="_blank" title="' + title + '">');
            body.push('<span class="caret"></span><span class="title">' + title + '</span>');
            body.push('</a></div></div>');
        }

        body.push('<div id="body"><ul class="table">');

        for (var i = 0; i < days && i < report.data.length; i++) {
            const day = report.data[i];

            const symbolName = ForecastHelper.iconName(day.icon, lang);
            const date = moment(new Date(day.time * 1000)).tz(place.timezone).locale(lang);

            body.push('<li class="item" onclick="window.open(\'' + url + '\', \'_blank\');">');
            body.push('<ul class="in-table"><li class="date"><div class="inner"><span class="day-name">' + date.format('ddd') + '</span><span class="day-date">' + date.format('D MMM') + '</span></div></li>');
            body.push('<li class="image"><div class="inner"><span class="w-icon wi-' + day.icon + '" title="' + symbolName + '"></span></div></li>');
            body.push('<li class="temp"><div class="inner"><div class="max">' + __('max') + ' ' + Math.round(day.temperatureHigh || day.temperature) + '&deg;</div><div class="min">' + __('min') + ' ' + Math.round(day.temperatureLow || day.temperature) + '&deg;</div></div></li>');
            if (showInfo) {
                body.push('<li class="info"><div class="inner">' + symbolName + '</div></li>');
            }
            body.push('</ul></li>');
        }
        body.push('</ul></div></div>');

        return body.join('');
    }
}
