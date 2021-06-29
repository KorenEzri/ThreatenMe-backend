"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const checkToken = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token || Array.isArray(token))
        return res.status(400).json({ error: 'No token sent' });
    token = token.split(' ')[1];
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, // @ts-ignore
    (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: err });
        }
        req.user = decoded;
        next();
    });
};
exports.checkToken = checkToken;
