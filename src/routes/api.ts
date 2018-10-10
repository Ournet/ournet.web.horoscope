
import { Router } from 'express';
import { apiHandler } from '../controllers/api-controller';

const route: Router = Router();

export default route;

//api
route.get('/api', (req, res, next) =>
    apiHandler({ req, res }, next));