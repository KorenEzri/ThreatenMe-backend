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
const logger_1 = __importDefault(require("../../../src/logger/logger"));
const express_1 = require("express");
const schemas_1 = require("../../db/schemas");
require('dotenv').config();
const databaseRouter = express_1.Router();
const avilableFilters = ['checked'];
const assignIfNotNull = (obj, val) => {
    if (val !== null) {
        Object.assign(obj, val);
    }
};
databaseRouter.get('/pastes/:source', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sources = ['Deeppaste', 'Stronghold'];
    const { source } = req.params;
    if (!sources.includes(source) || !source)
        return res.status(400).send();
    try {
        const pastes = yield schemas_1.Paste.find({ source });
        console.log(pastes);
        logger_1.default.info('Sending All Pastes from database for source: ', source, '. Length: ', pastes.length);
        res.status(200).send(pastes);
    }
    catch (err) {
        logger_1.default.error(err);
        res.status(500).send('Internal server error');
    }
}));
databaseRouter.get('/pastes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filtersArr = Object.keys(req.query)
        // @ts-ignore
        .filter((query) => avilableFilters.includes(query))
        .map(filter => ({ [filter]: req.query[filter] }));
    const filters = {};
    filtersArr.forEach((filter) => assignIfNotNull(filters, filter));
    try {
        const pastes = yield schemas_1.Paste.find(filters);
        logger_1.default.info(`Sending pastes from database according to filters: ${Object.keys(filters)}, Length: ${pastes.length}`);
        res.status(200).send(pastes);
    }
    catch (err) {
        logger_1.default.error(err);
        res.status(500).send('Internal server error');
    }
}));
databaseRouter.post('/updatechecked', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { checkedPaste } = req.body;
    console.log(checkedPaste);
    try {
        logger_1.default.info('Updating paste..');
        yield schemas_1.Paste.findOneAndUpdate({ _id: checkedPaste._id }, { $set: checkedPaste });
        res.status(200).send('OK');
    }
    catch (err) {
        logger_1.default.error(err);
        res.status(500).send('Internal server error');
    }
}));
exports.default = databaseRouter;
