"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkToken_1 = require("../../middelwares/checkToken");
const auth_1 = __importDefault(require("./auth"));
const onion_1 = __importDefault(require("./onion"));
const database_1 = __importDefault(require("./database"));
const router = express_1.Router();
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
};
router.use(auth_1.default);
router.use('/onion', onion_1.default);
router.use('/database', database_1.default);
router.use(checkToken_1.checkToken);
router.use(unknownEndpoint);
exports.default = router;
