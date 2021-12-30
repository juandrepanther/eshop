"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var category_1 = __importDefault(require("./category"));
var currencies_1 = __importDefault(require("./currencies"));
var resolvers = {
    Query: {
        category: category_1.default,
        currencies: currencies_1.default
    }
};
exports.default = resolvers;
