import { Router, Response, Request } from 'express';
import { ParseInnerText } from '../../utils';
import * as onions from '../../utils/onion.util';
import * as pastes from '../../utils/pastes.util';

require('dotenv').config();

const onionRouter = Router();
onionRouter.get('/deeppaste', async (req: Request, res: Response) => {
  const scrapedData = await pastes.SortPastes(
    'http://paste6kr6ttc5chv.onion/top.php',
    'body',
    'innerText',
  );
  res.status(200).send(scrapedData);
});
onionRouter.get('/stronghold', async (req: Request, res: Response) => {
  const strongholdUrls = [
    'http://nzxj65x32vh2fkhk.onion/all',
    'http://nzxj65x32vh2fkhk.onion/all?page=2',
    'http://nzxj65x32vh2fkhk.onion/all?page=3',
  ];
  const scrapedData = await Promise.all(
    strongholdUrls.map(async (url: string) => {
      const data = await pastes.SortPastesWithoutLinks(
        url,
        'div.row',
        'innerText',
      );
      try {
        return data.map((paste: string) => {
          if (paste.split(' ').length > 2) {
            return ParseInnerText(paste);
          }
        });
      } catch ({ message }) {
        console.log(message);
        return data;
      }
    }),
  );
  res.status(200).send(scrapedData);
});
onionRouter.get('/allurls', async (req: Request, res: Response) => {
  try {
    const { data } = await onions.getUrls();
    data ? res.status(200).send(data) : res.status(404).send('Data not found.');
  } catch ({ message }) {
    console.log(message);
    res.status(500).json({
      message: `There was an error processing the request, ${message}`,
    });
  }
});
onionRouter.post('/url', async (req: Request, res: Response) => {
  console.log(req.body);
  const { url } = req.body;
  const fullUrl = 'http://' + url;
  try {
    const urlsFromSource = await onions.getUrls(fullUrl);
    if (urlsFromSource) res.status(200).send(urlsFromSource);
  } catch ({ message }) {
    console.log(message);
    res.status(500).json({
      message: `There was an error processing the request, ${message}`,
    });
  }
});

onionRouter.post('/scrape', async (req: Request, res: Response) => {
  const { url, selector, attribute, options } = req.body;
  try {
    const response = await onions.scrapWebsite(url, selector, attribute);
    if (response) res.status(200).send(response);
  } catch ({ message }) {
    console.log(message);
    res.status(500).json({
      message: `There was an error processing the request, ${message}`,
    });
  }
});
// onions.scrapWebsite('http://nzxj65x32vh2fkhk.onion/all', 'div');
onionRouter.post('/delete', (req: Request, res: Response) => {});

onionRouter.post('/update', (req: Request, res: Response) => {});

export default onionRouter;
