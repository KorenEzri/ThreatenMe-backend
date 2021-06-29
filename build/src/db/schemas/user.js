"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userDbSchema = new mongoose_1.default.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    lastConnected: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    createdAt: { type: Date, default: new Date() },
    phone: { type: String },
    avatar: String,
    email: { type: String, required: true },
    language: { type: String, default: 'he' },
    gender: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    address: Object,
});
userDbSchema.set('toJSON', {
    transform: (_, returnedObject) => {
        delete returnedObject.__v;
    },
});
exports.User = mongoose_1.default.model('User', userDbSchema);
