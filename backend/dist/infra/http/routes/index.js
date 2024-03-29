"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = exports.productRoutes = exports.orderRoutes = void 0;
var orderRoutes_1 = require("./orderRoutes");
Object.defineProperty(exports, "orderRoutes", { enumerable: true, get: function () { return __importDefault(orderRoutes_1).default; } });
var productRoutes_1 = require("./productRoutes");
Object.defineProperty(exports, "productRoutes", { enumerable: true, get: function () { return __importDefault(productRoutes_1).default; } });
var userRoutes_1 = require("./userRoutes");
Object.defineProperty(exports, "userRoutes", { enumerable: true, get: function () { return __importDefault(userRoutes_1).default; } });
