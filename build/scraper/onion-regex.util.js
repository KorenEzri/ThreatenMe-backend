"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOnion = void 0;
const v2 = '[a-z2-7]{16}.onion';
const v3 = '[a-z2-7]{56}.onion';
const isOnion = (options) => options && options.exact
    ? new RegExp(`(?:^${v2}$)|(?:^${v3}$)`)
    : new RegExp(`${v2}|${v3}`, 'g');
exports.isOnion = isOnion;
exports.isOnion.v2 = (options) => options && options.exact ? new RegExp(`^${v2}$`) : new RegExp(v2, 'g');
exports.isOnion.v3 = (options) => options && options.exact ? new RegExp(`^${v3}$`) : new RegExp(v3, 'g');
