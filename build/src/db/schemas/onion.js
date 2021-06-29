"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Onion = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const onionDbSchema = new mongoose_1.default.Schema({
    keyword: String,
    source: String,
    urls: Array,
    active: Boolean,
    createdAt: Date || String,
    updatedAt: Date || String,
});
onionDbSchema.plugin(mongoose_unique_validator_1.default);
onionDbSchema.set('toJSON', {
    transform: (_, returnedObject) => {
        delete returnedObject.__v;
    },
});
exports.Onion = mongoose_1.default.model('Onion', onionDbSchema);
