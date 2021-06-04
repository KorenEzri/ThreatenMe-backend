import { Router, Response, Request } from 'express';
import { scrapeWebsite } from '../../../scraper';

require('dotenv').config();

const ideaRouter = Router();
const url = '22tojepqmpah32fkeuurutki7o5bmb45uhmgzdg4l2tk34fkdafgt7id.onion';
scrapeWebsite({ url, withProxy: true, headless: false });
ideaRouter.get('/all', (req: Request, res: Response) => {});

ideaRouter.post('/create', (req: Request, res: Response) => {});

ideaRouter.post('/delete', (req: Request, res: Response) => {});

ideaRouter.post('/update', (req: Request, res: Response) => {});

export default ideaRouter;
