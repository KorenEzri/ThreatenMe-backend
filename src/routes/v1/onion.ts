import Logger from '../../../src/logger/logger';
import { Router, Response, Request } from 'express';
import { savePastesToDB } from '../../utils';
import * as onions from '../../utils/onion.util';

require('dotenv').config();
const onionRouter = Router();
onionRouter.post('/deeppaste', async (req: Request, res: Response) => {
  const scrapes = req.body;
  try {
    Logger.info(
      `Received parsed unchecked paste data, length: ${scrapes.length}`,
    );
    await savePastesToDB(scrapes);
    res.status(200).send('OK');
  } catch (err) {
    Logger.error(err);
    res.status(500).send('Internal server error.');
  }
});
onionRouter.post('/stronghold', async (req: Request, res: Response) => {
  const scrapes = req.body;
  try {
    Logger.info(
      `Received parsed unchecked paste data, length: ${scrapes.length}`,
    );
    await savePastesToDB(scrapes);
    res.status(200).send('OK');
  } catch (err) {
    Logger.error(err);
    res.status(500).send('Internal server error.');
  }
});
onionRouter.get('/allurls', async (req: Request, res: Response) => {
  try {
    const { data } = await onions.getUrls();
    data ? res.status(200).send(data) : res.status(404).send('Data not found.');
  } catch (err) {
    Logger.error(err);
    res.status(500).json({
      message: `There was an error processing the request, ${err.message}`,
    });
  }
});
onionRouter.post('/url', async (req: Request, res: Response) => {
  const { url } = req.body;
  const fullUrl = 'http://' + url;
  try {
    const urlsFromSource = await onions.getUrls(fullUrl);
    if (urlsFromSource) res.status(200).send(urlsFromSource);
  } catch (err) {
    Logger.error(err);
    res.status(500).json({
      message: `There was an error processing the request, ${err.message}`,
    });
  }
});
onionRouter.post('/scrape', async (req: Request, res: Response) => {
  const { options } = req.body;
  res.status(200).send('OK');
  return;
  // try {
  //   const response = await onions.scrapWebsite(url, selector, attribute);
  //   if (response) res.status(200).send(response);
  // } catch (err) {
  //   Logger.error(err);
  //   res.status(500).json({
  //     message: `There was an error processing the request, ${err.message}`,
  //   });
  // }
});
onionRouter.post('/delete', (req: Request, res: Response) => {});
onionRouter.post('/update', (req: Request, res: Response) => {});
export default onionRouter;
