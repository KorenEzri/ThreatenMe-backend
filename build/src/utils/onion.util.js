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
exports.scrapWebsite = exports.getUrls = void 0;
const schemas_1 = require("../db/schemas");
const scraper_1 = require("../../scraper");
var Responses;
(function (Responses) {
    Responses[Responses["ERROR"] = 1] = "ERROR";
    Responses[Responses["SUCCESS"] = 2] = "SUCCESS";
    Responses[Responses["FOUND_IN_DB"] = 3] = "FOUND_IN_DB";
    Responses[Responses["NOT_FOUND_IN_DB"] = 4] = "NOT_FOUND_IN_DB";
    Responses[Responses["SAVED_TO_DB"] = 5] = "SAVED_TO_DB";
    Responses[Responses["COULD_NOT_SAVE_TO_DB"] = 6] = "COULD_NOT_SAVE_TO_DB";
})(Responses || (Responses = {}));
const getUrlsFromDatabase = (sourceUrl) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let allSourceUrls;
    try {
        allSourceUrls = yield schemas_1.Onion.findOne({ source: sourceUrl });
    }
    catch ({ message }) {
        console.log('Error at getUrlsFromDatabase() at onion.util.ts at ~line 11', message);
        return {
            status: Responses.ERROR,
        };
    }
    if ((_a = allSourceUrls === null || allSourceUrls === void 0 ? void 0 : allSourceUrls.urls) === null || _a === void 0 ? void 0 : _a.length)
        return {
            status: Responses.FOUND_IN_DB,
            data: allSourceUrls,
        };
    else
        return {
            status: Responses.NOT_FOUND_IN_DB,
        };
});
const getUrlsFromScraper = (sourceUrl) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const scraperRes = yield scraper_1.scrapeWebsite({
            url: sourceUrl,
            withProxy: true,
            headless: true,
            data: {
                selector: 'a',
            },
        });
        if (!scraperRes.length)
            return { status: Responses.ERROR };
        yield saveUrlsToDB(sourceUrl, scraperRes);
        return {
            status: Responses.SUCCESS,
            data: scraperRes,
        };
    }
    catch ({ message }) {
        console.log('Error at getUrlsFromScraper() at onion.util.ts at ~line 31');
        return {
            status: Responses.ERROR,
        };
    }
});
const saveUrlsToDB = (sourceUrl, urls) => __awaiter(void 0, void 0, void 0, function* () {
    const newSource = new schemas_1.Onion({
        source: sourceUrl,
        urls: urls,
    });
    try {
        yield newSource.save();
        return {
            status: Responses.SAVED_TO_DB,
        };
    }
    catch ({ message }) {
        console.log('Error at saveUrlsToDB() at onion.util.ts at ~line 57');
        return {
            stats: Responses.COULD_NOT_SAVE_TO_DB,
        };
    }
});
const getUrls = (sourceUrl) => __awaiter(void 0, void 0, void 0, function* () {
    let url;
    !sourceUrl
        ? (url =
            'http://22tojepqmpah32fkeuurutki7o5bmb45uhmgzdg4l2tk34fkdafgt7id.onion/')
        : (url = sourceUrl);
    const databaseRes = yield getUrlsFromDatabase(url);
    if (databaseRes.status === Responses.NOT_FOUND_IN_DB) {
        return yield getUrlsFromScraper(url);
    }
    else
        return databaseRes;
});
exports.getUrls = getUrls;
const scrapWebsite = (url, selector, attribute) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        url: url,
        withProxy: true,
        headless: true,
        data: { selector: selector, attribute: attribute },
    };
    return yield scraper_1.scrapeWebsite(options);
});
exports.scrapWebsite = scrapWebsite;
