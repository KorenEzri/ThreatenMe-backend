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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalScrape = exports.getHrefs = exports.scrapeAll = exports.startBrowser = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const startBrowser = (headless, withProxy, proxyUrl) => __awaiter(void 0, void 0, void 0, function* () {
    let browser;
    const defaultProxyUrl = '9050';
    // const runWithProxy = [
    //   `--proxy-server=socks5://127.0.0.1:${proxyUrl || defaultProxyUrl}`,
    //   '--disable-setuid-sandbox',
    //   '--no-sandbox',
    // ];
    const runWithProxy = [
        `--proxy-server=socks5://host.docker.internal:${proxyUrl || defaultProxyUrl}`,
        '--disable-setuid-sandbox',
        '--no-sandbox',
        '--link webappnetwork:webappnetwork',
    ];
    let args = [];
    if (withProxy)
        args = args.concat(runWithProxy);
    try {
        console.log('Opening the browser......');
        browser = yield puppeteer_1.default.launch({
            headless: headless,
            args,
            ignoreHTTPSErrors: true,
        });
    }
    catch (err) {
        console.log('Could not create a browser instance => : ', err);
    }
    return browser;
});
exports.startBrowser = startBrowser;
const scrapeAll = (scraperObject, browserInstance) => __awaiter(void 0, void 0, void 0, function* () {
    let browser;
    try {
        browser = yield browserInstance;
        const response = yield scraperObject.scraper(browser);
        return response;
    }
    catch (err) {
        console.log('Could not resolve the browser instance => ', err);
    }
});
exports.scrapeAll = scrapeAll;
const getHrefs = (selector, pageInstance) => __awaiter(void 0, void 0, void 0, function* () {
    return yield pageInstance.$$eval(selector, (as) => as.map((a) => a.href));
});
exports.getHrefs = getHrefs;
const generalScrape = (selector, pageInstance, attribute) => __awaiter(void 0, void 0, void 0, function* () {
    switch (attribute) {
        case 'textContent':
            return yield pageInstance.$$eval(selector, (as) => as.map((a) => a.textContent));
        case 'innerText':
            return yield pageInstance.$$eval(selector, (as) => as.map((a) => a.innerText));
        default:
            if (attribute) {
                return yield pageInstance.$$eval(selector, (as) => as.map((a) => a.getAttribute(attribute)));
            }
            else {
                return yield pageInstance.$$eval(selector, (as) => as.map((a) => a));
            }
    }
});
exports.generalScrape = generalScrape;
