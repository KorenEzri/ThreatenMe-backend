import puppeteer from 'puppeteer';
export interface Options {
  headless?: boolean;
  url?: string;
  keyword?: string;
  search_params?: string;
  withProxy?: boolean;
  proxyUrl?: string;
}
const startBrowser = async (
  headless: boolean,
  withProxy: boolean,
  proxyUrl?: string,
) => {
  let browser;
  const defaultProxyUrl = '9050';
  const runWithProxy = [
    `--proxy-server=socks5://127.0.0.1:${proxyUrl || defaultProxyUrl}`,
    '--disable-setuid-sandbox',
  ];
  let args: string[] = [];
  if (withProxy) args = args.concat(runWithProxy);
  try {
    console.log('Opening the browser......');
    browser = await puppeteer.launch({
      headless: headless,
      args,
      ignoreHTTPSErrors: true,
    });
  } catch (err) {
    console.log('Could not create a browser instance => : ', err);
  }
  return browser;
};
const scrapeAll = async (
  scraperObject: { scraper: (arg0: any) => any },
  browserInstance: any,
) => {
  let browser;
  try {
    browser = await browserInstance;
    await scraperObject.scraper(browser);
  } catch (err) {
    console.log('Could not resolve the browser instance => ', err);
  }
};
export const scrapeWebsite = async (options: Options) => {
  let { headless, url, keyword, search_params, withProxy, proxyUrl } = options;
  if (!withProxy) withProxy = false;
  if (headless === undefined) headless = true;
  const browserInstance = await startBrowser(headless, withProxy, proxyUrl);
  const scraperObject = {
    url: url,
    async scraper(browser: { newPage: () => any }) {
      let page = await browser.newPage();
      console.log(`Navigating to ${this.url}...`);
      await page.goto(this.url);
      setTimeout(async () => {
        await page.close();
        console.log('Page closed.');
      }, 2000);
    },
  };
  await scrapeAll(scraperObject, browserInstance);
};
