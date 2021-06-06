import { Onion } from '../db/schemas';
import { scrapeWebsite } from '../../scraper';

enum Responses {
  ERROR = 1,
  SUCCESS,
  FOUND_IN_DB,
  NOT_FOUND_IN_DB,
  SAVED_TO_DB,
  COULD_NOT_SAVE_TO_DB,
}

const getUrlsFromDatabase = async (sourceUrl?: string) => {
  let allSourceUrls;
  try {
    allSourceUrls = await Onion.findOne({ source: sourceUrl });
  } catch ({ message }) {
    console.log(
      'Error at getUrlsFromDatabase() at onion.util.ts at ~line 11',
      message,
    );
    return {
      status: Responses.ERROR,
    };
  }
  if (allSourceUrls?.urls?.length)
    return {
      status: Responses.FOUND_IN_DB,
      data: allSourceUrls,
    };
  else
    return {
      status: Responses.NOT_FOUND_IN_DB,
    };
};
const getUrlsFromScraper = async (sourceUrl: string) => {
  try {
    const scraperRes = await scrapeWebsite({
      url: sourceUrl,
      withProxy: true,
      headless: true,
      data: {
        selector: 'a',
      },
    });
    if (!scraperRes.length) return { status: Responses.ERROR };
    await saveUrlsToDB(sourceUrl, scraperRes);
    return {
      status: Responses.SUCCESS,
      data: scraperRes,
    };
  } catch ({ message }) {
    console.log('Error at getUrlsFromScraper() at onion.util.ts at ~line 31');
    return {
      status: Responses.ERROR,
    };
  }
};
const saveUrlsToDB = async (sourceUrl: string, urls: string[]) => {
  const newSource = new Onion({
    source: sourceUrl,
    urls: urls,
  });
  try {
    await newSource.save();
    return {
      status: Responses.SAVED_TO_DB,
    };
  } catch ({ message }) {
    console.log('Error at saveUrlsToDB() at onion.util.ts at ~line 57');
    return {
      stats: Responses.COULD_NOT_SAVE_TO_DB,
    };
  }
};
export const getUrls = async (sourceUrl?: string) => {
  let url;
  !sourceUrl
    ? (url =
        'http://22tojepqmpah32fkeuurutki7o5bmb45uhmgzdg4l2tk34fkdafgt7id.onion/')
    : (url = sourceUrl);
  const databaseRes = await getUrlsFromDatabase(url);
  if (databaseRes.status === Responses.NOT_FOUND_IN_DB) {
    return await getUrlsFromScraper(url);
  } else return databaseRes;
};
export const scrapWebsite = async (
  url: string,
  selector: string,
  attribute?: string,
) => {
  const options = {
    url: url,
    withProxy: true,
    headless: true,
    data: { selector: selector, attribute: attribute },
  };
  return await scrapeWebsite(options);
};
