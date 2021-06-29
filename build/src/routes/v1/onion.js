"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const logger_1 = __importDefault(require("../../../src/logger/logger"));
const express_1 = require("express");
const utils_1 = require("../../utils");
const onions = __importStar(require("../../utils/onion.util"));
require('dotenv').config();
const onionRouter = express_1.Router();
onionRouter.post('/deeppaste', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const scrapes = req.body;
    try {
        logger_1.default.info(`Received parsed unchecked paste data, length: ${scrapes.length}`);
        yield utils_1.savePastesToDB(scrapes);
        res.status(200).send('OK');
    }
    catch (err) {
        logger_1.default.error(err);
        res.status(500).send('Internal server error.');
    }
}));
onionRouter.post('/stronghold', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const scrapes = req.body;
    try {
        logger_1.default.info(`Received parsed unchecked paste data, length: ${scrapes.length}`);
        yield utils_1.savePastesToDB(scrapes);
        res.status(200).send('OK');
    }
    catch (err) {
        logger_1.default.error(err);
        res.status(500).send('Internal server error.');
    }
}));
onionRouter.get('/allurls', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield onions.getUrls();
        data ? res.status(200).send(data) : res.status(404).send('Data not found.');
    }
    catch (err) {
        logger_1.default.error(err);
        res.status(500).json({
            message: `There was an error processing the request, ${err.message}`,
        });
    }
}));
onionRouter.post('/url', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    const fullUrl = 'http://' + url;
    try {
        const urlsFromSource = yield onions.getUrls(fullUrl);
        if (urlsFromSource)
            res.status(200).send(urlsFromSource);
    }
    catch (err) {
        logger_1.default.error(err);
        res.status(500).json({
            message: `There was an error processing the request, ${err.message}`,
        });
    }
}));
onionRouter.post('/scrape', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
onionRouter.post('/delete', (req, res) => { });
onionRouter.post('/update', (req, res) => { });
exports.default = onionRouter;
