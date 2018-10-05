
import redirectRoute from './redirects'
import homeRoute from './home'
import widgetRoute from './widget'
import controlsRoute from './controls'
import { Express } from 'express'

export default function (app: Express) {
    app.use(redirectRoute);
    app.use(homeRoute);
    app.use(controlsRoute);
    app.use(widgetRoute);
}
