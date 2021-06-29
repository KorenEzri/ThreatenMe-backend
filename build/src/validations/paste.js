"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pasteSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.pasteSchema = joi_1.default.object({
    source: joi_1.default.string().required(),
    title: joi_1.default.string().required(),
    language: joi_1.default.string().required(),
    posted_by: joi_1.default.string().required(),
    body: joi_1.default.string().required(),
});
