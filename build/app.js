"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const routes_1 = __importDefault(require("./src/routes"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default({
    allowedHeaders: ['Content-Type'],
    origin: '*',
    preflightContinue: true,
}));
app.use(helmet_1.default());
app.use('/api', routes_1.default);
exports.default = app;
