"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
require('dotenv').config();
const authRouter = express_1.Router();
authRouter.post('/login', (req, res) => {
});
authRouter.post('/register', (req, res) => {
});
authRouter.post('/verify-email', (req, res) => {
});
exports.default = authRouter;
