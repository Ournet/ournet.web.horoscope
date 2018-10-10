
import redirectRoute from './redirects'
import homeRoute from './home'
import apiRoute from './api'
import { Express } from 'express'

export default function (app: Express) {
    app.use(redirectRoute);
    app.use(apiRoute);
    app.use(homeRoute);
}
