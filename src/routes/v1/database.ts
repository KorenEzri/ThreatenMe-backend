import Logger from '../../../src/logger/logger';
import { Router, Response, Request } from 'express';
import { Paste } from '../../db/schemas';
require('dotenv').config();
const databaseRouter = Router();
const avilableFilters = ['checked'] as const;
const assignIfNotNull = (obj: {}, val: typeof avilableFilters[number]) => {
  if (val !== null) {
    Object.assign(obj, val);
  }
};

databaseRouter.get('/pastes/:source', async (req: Request, res: Response) => {
  const sources = ['Deeppaste', 'Stronghold'];
  const { source } = req.params;
  if (!sources.includes(source) || !source) return res.status(400).send();
  try {
    const pastes = await Paste.find({ source });
    console.log(pastes);
    Logger.info(
      'Sending All Pastes from database for source: ',
      source,
      '. Length: ',
      pastes.length,
    );
    res.status(200).send(pastes);
  } catch (err) {
    Logger.error(err);
    res.status(500).send('Internal server error');
  }
});

databaseRouter.get('/pastes', async (req: Request, res: Response) => {
  const filtersArr = Object.keys(req.query)
    // @ts-ignore
    .filter((query: string) => avilableFilters.includes(query))
    .map(filter => ({ [filter]: req.query[filter] }));
  const filters = {};
  filtersArr.forEach((filter: any) => assignIfNotNull(filters, filter));
  try {
    const pastes = await Paste.find(filters);
    Logger.info(
      `Sending pastes from database according to filters: ${Object.keys(
        filters,
      )}, Length: ${pastes.length}`,
    );
    res.status(200).send(pastes);
  } catch (err) {
    Logger.error(err);
    res.status(500).send('Internal server error');
  }
});

databaseRouter.post('/updatechecked', async (req: Request, res: Response) => {
  const { checkedPaste } = req.body;
  console.log(checkedPaste);
  try {
    Logger.info('Updating paste..');
    await Paste.findOneAndUpdate(
      { _id: checkedPaste._id },
      { $set: checkedPaste },
    );
    res.status(200).send('OK');
  } catch (err) {
    Logger.error(err);
    res.status(500).send('Internal server error');
  }
});
export default databaseRouter;
