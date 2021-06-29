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
exports.ParseAndSaveDeeppasteData = exports.ParseAndSaveStrongholdData = exports.strongholdUrls = void 0;
const pastes_util_1 = require("./pastes.util");
exports.strongholdUrls = [
    'http://nzxj65x32vh2fkhk.onion/all',
    'http://nzxj65x32vh2fkhk.onion/all?page=2',
    'http://nzxj65x32vh2fkhk.onion/all?page=3',
];
const rules = {
    ignore: ['preview', 'Show paste', ''],
};
const ParseAndSaveStrongholdData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const parsed = data
        .map((paste) => {
        if (paste.split(' ').length > 2) {
            return ParseInnerText(paste, 'Stronghold');
        }
    })
        .filter((el) => {
        return el != null;
    })
        .flat(1);
    const saved = yield pastes_util_1.savePastesToDB(parsed);
    return { parsed, status: saved };
});
exports.ParseAndSaveStrongholdData = ParseAndSaveStrongholdData;
const ParseAndSaveDeeppasteData = (data) => __awaiter(void 0, void 0, void 0, function* () { });
exports.ParseAndSaveDeeppasteData = ParseAndSaveDeeppasteData;
const ParseInnerText = (text, source) => {
    try {
        const splat = text.split('\n');
        if (splat.length < 3)
            return;
        const filtered = splat.filter(line => !rules.ignore.includes(line));
        const parsedData = filtered.map((line, index) => {
            if (filtered && filtered[0])
                return {
                    source: source,
                    title: filtered[0],
                    language: filtered[filtered.length - 1],
                    posted_by: filtered[filtered.length - 2],
                    body: filtered.slice(1, -2).join('\n'),
                };
        });
        const uniqueArray = parsedData.filter((thing, index) => {
            const _thing = JSON.stringify(thing);
            return (index ===
                parsedData.findIndex(obj => {
                    return JSON.stringify(obj) === _thing;
                }));
        });
        return uniqueArray;
    }
    catch ({ message }) {
        console.log(message);
    }
};
