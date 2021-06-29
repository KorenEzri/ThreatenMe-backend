"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paste = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const pasteDbSchema = new mongoose_1.default.Schema({
    __id: String,
    uniqueIdentifier: { type: String, unique: true },
    checked: { type: Boolean, default: false },
    source: String,
    title: String,
    language: String,
    posted_by: String,
    body: String,
    badword_count: Number,
    badwords: Array,
    title_sentiment: Number,
    body_sentiment: Number,
    threat_level: Number,
    createdAt: Date || String,
    updatedAt: { type: Date || String, default: new Date() },
});
pasteDbSchema.plugin(mongoose_unique_validator_1.default);
pasteDbSchema.set('toJSON', {
    transform: (_, returnedObject) => {
        delete returnedObject.__v;
    },
});
exports.Paste = mongoose_1.default.model('Paste', pasteDbSchema);
