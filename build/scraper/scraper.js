"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeWebsite = void 0;
const scrape_util_1 = require("./scrape.util");
const switchResponse = (pageInstance, selector, attribute) => __awaiter(void 0, void 0, void 0, function* () {
    switch (selector) {
        case 'a':
            const hrefRes = yield scrape_util_1.getHrefs('a', pageInstance);
            return hrefRes;
        default:
            const response = yield scrape_util_1.generalScrape(selector, pageInstance, attribute);
            return response;
            break;
    }
});
const scrapeWebsite = (options) => __awaiter(void 0, void 0, void 0, function* () {
    let { headless, url, keyword, search_params, withProxy, proxyUrl, data: { selector, attribute }, } = options;
    if (!withProxy)
        withProxy = false;
    if (headless === undefined)
        headless = true;
    const browserInstance = yield scrape_util_1.startBrowser(headless, withProxy, proxyUrl);
    const scraperObject = {
        url: url,
        scraper(browser) {
            return __awaiter(this, void 0, void 0, function* () {
                let page = yield browser.newPage();
                console.log(`Navigating to ${this.url}...`);
                yield page.goto(this.url, { waitUntil: 'networkidle2', timeout: 0 });
                const response = yield switchResponse(page, selector, attribute);
                yield page.close();
                console.log('Page closed.');
                return response;
            });
        },
    };
    return yield scrape_util_1.scrapeAll(scraperObject, browserInstance);
});
exports.scrapeWebsite = scrapeWebsite;
