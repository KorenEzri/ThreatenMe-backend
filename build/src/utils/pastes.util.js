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
Object.defineProperty(exports, "__esModule", { value: true });
exports.savePastesToDB = exports.getPastesWithoutLinks = exports.getPastes = exports.generateHash = void 0;
const onions = __importStar(require("../utils/onion.util"));
const schemas_1 = require("../db/schemas");
const validations_1 = require("../validations");
const generateHash = (title, body) => {
    const wordToHash = title + body;
    let hash = 0, i, chr;
    if (wordToHash.length === 0)
        return `${hash}`;
    for (i = 0; i < wordToHash.length; i++) {
        chr = wordToHash.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0;
    }
    return `${hash}`;
};
exports.generateHash = generateHash;
const getPastes = (pasteSiteLink, selector, attribute) => __awaiter(void 0, void 0, void 0, function* () {
    const pasteLinks = yield onions.scrapWebsite(pasteSiteLink, 'a');
    return yield Promise.all(pasteLinks.map((link, index) => __awaiter(void 0, void 0, void 0, function* () {
        const scraped = yield onions.scrapWebsite(link, selector, attribute);
        return scraped;
    })));
});
exports.getPastes = getPastes;
const getPastesWithoutLinks = (pasteSiteLink, selector, attribute) => __awaiter(void 0, void 0, void 0, function* () {
    return yield onions.scrapWebsite(pasteSiteLink, selector, attribute);
});
exports.getPastesWithoutLinks = getPastesWithoutLinks;
const validateAndGenerateHashfromPastes = (pastes) => {
    const formattedPastes = [];
    for (let i = 0; i < pastes.length; i++) {
        const currentPaste = pastes[i];
        const isValid = validations_1.pasteSchema.validate(currentPaste);
        if (!isValid)
            continue;
        const { title, body } = currentPaste;
        const formattedPaste = Object.assign(Object.assign({}, currentPaste), { uniqueIdentifier: exports.generateHash(title, body) });
        formattedPastes.push(formattedPaste);
    }
    return formattedPastes;
};
const savePastesToDB = (pastes) => __awaiter(void 0, void 0, void 0, function* () {
    const formattedPastes = validateAndGenerateHashfromPastes(pastes);
    try {
        yield schemas_1.Paste.insertMany(formattedPastes, { ordered: false });
        return 'OK';
    }
    catch ({ message }) {
        console.log(message);
        return 'ERROR';
    }
});
exports.savePastesToDB = savePastesToDB;
