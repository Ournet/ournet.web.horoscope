
import { Router } from 'express';
import { RootModelBuilder, RootViewModel } from '../view-models/root-view-model';
import { getHost } from 'ournet.links';
import { widget1FrameHandler, widget2FrameHandler, widgetHandler } from '../controllers/widgets-controller';
import { Widget2ViewModelBuilder } from '../view-models/widget2-view-model';
import { isNullOrEmpty } from '../utils';
import { maxage } from '../maxage';

const route: Router = Router();

export default route;

route.get('/widget', (req, res, next) => widgetHandler({ req, res }, next));

route.get('/widget/widget_frame', (req, res, next) =>
    widget1FrameHandler({
        req,
        res,
        bkcolor: req.query.bkcolor,
        days: parseInt(req.query.days),
        htcolor: req.query.htcolor,
        id: req.query.id,
        hbkcolor: req.query.hbkcolor,
        bcolor: req.query.bcolor,
        lcolor: req.query.lcolor,
        textcolor: req.query.textcolor,
        w: parseInt(req.query.w),
    }, next));

route.get('/widget/widget_html_script', function (req, res) {
    const model = new RootModelBuilder({ req, res }).build() as RootViewModel;
    const { config, links, country, project } = model;

    maxage(res, 60);

    const days = req.query.days && parseInt(req.query.days) || 5,
        height = 29 + days * 42 + days - 1,
        width = req.query.w;
    const scripttype = req.query.scripttype || 'iframe';

    delete req.query.scripttype;

    const data = ['<!-- ' + config.name + ' Weather Widget -->'];

    const host = getHost(project, country);

    for (let prop in req.query) {
        if (isNullOrEmpty(req.query[prop])) {
            delete req.query[prop];
        }
    }

    if (scripttype === 'iframe') {
        data.push('<iframe src="//' + host + links.weather.widget.widgetFrame(req.query) + '" scrolling="no" frameborder="0" style="border:none;overflow:hidden;height:' + height + 'px;width:' + width + 'px;" allowTransparency="true"></iframe>');
        data.push('<noscript><a href="http://' + host + '">' + config.name + '</a></noscript>');
    } else {

        let params = [];
        for (var prop in req.query) {
            if (![null, '', undefined].includes(req.query[prop])) {
                params.push(prop + '=' + req.query[prop]);
            }
        }
        data.push('<ins class="ournetweather" style="display:block;max-width:' + width + 'px;height:' + height + 'px" data-type="widget" data-cn="' + country + '" data-params="' + params.join(';') + '" data-h="' + height + '"></ins>');
        data.push('<noscript><a href="http://' + host + '">' + config.name + '</a></noscript>');
        data.push('<script>(ournetweather=window.ournetweather||[]).push({})</script>');
        data.push('<script async src="//assets.ournetcdn.net/ournet/js/weather/widget-ins.js"></script>');
    }

    res.send(data.join('\n'));
});

route.get('/widget2/widget_frame', (req, res, next) =>
    widget2FrameHandler(Widget2ViewModelBuilder.inputFromRequest(req, res), next));

route.get('/widget2/widget_html_script', function (req, res) {
    const model = new RootModelBuilder({ req, res }).build() as RootViewModel;
    const { config, links, country, project } = model;

    maxage(res, 60);

    const scripttype = req.query.scripttype || 'iframe';

    delete req.query.cn;
    delete req.query.scripttype;

    let script = '';
    const host = getHost(project, country);

    for (let prop in req.query) {
        if (isNullOrEmpty(req.query[prop])) {
            delete req.query[prop];
        }
    }

    const widgetInfo = Widget2ViewModelBuilder.createWidgetInfo(Widget2ViewModelBuilder.inputFromRequest(req, res));
    const iframeHeight = widgetInfo.iframeHeight;

    if (scripttype === 'iframe') {
        const data = ['<!-- ' + config.name + ' Weather Widget -->'];
        data.push('<iframe src="//' + host, links.weather.widget2.widgetFrame(req.query) + '" scrolling="no" frameborder="0" style="border:none;overflow:hidden;height:' + iframeHeight + 'px;width:' + req.query.w + 'px;" allowTransparency="true"></iframe>');
        data.push('<noscript><a href="http://' + config.host + '">' + config.name + '</a></noscript>');
        script = data.join('\n');
    } else {
        const params = [];
        for (var prop in req.query) {
            if (![null, '', undefined].includes(req.query[prop])) {
                params.push(prop + '=' + req.query[prop]);
            }
        }

        script = ['<!-- ' + config.name + ' Weather Widget -->',
        '<ins class="ournetweather" style="display:block;max-width:' + req.query.w + 'px;height:' + iframeHeight + 'px" data-cn="' + config.country + '" data-params="' + params.join(';') + '" data-h="' + iframeHeight + '"></ins>',
        '<noscript><a href="http://' + config.host + '">' + config.name + '</a></noscript>',
            '<script>(ournetweather=window.ournetweather||[]).push({})</script>',
            '<script async src="//assets.ournetcdn.net/ournet/js/weather/widget-ins.js"></script>'
        ].join('\n');
    }
    res.send(script);
});