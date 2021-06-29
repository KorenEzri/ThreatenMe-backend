"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const logger_1 = __importDefault(require("./src/logger/logger"));
const connections_1 = require("./src/db/connections");
require('dotenv').config();
const PORT = process.env.PORT || 8080;
app_1.default.listen(PORT, () => {
    logger_1.default.info(`server running on port ${PORT}`);
});
connections_1.connectToDb();
