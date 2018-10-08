
import { Router } from 'express';
import { indexHandler } from '../controllers/index-controller';

const route: Router = Router();

export default route;

//index
route.get('/', (req, res, next) =>
    indexHandler({ req, res }, next));
