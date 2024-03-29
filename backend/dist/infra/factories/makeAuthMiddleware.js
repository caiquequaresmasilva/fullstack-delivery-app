"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adapters_1 = require("../adapters");
const middlewares_1 = require("../http/middlewares");
function makeAuthMiddleware() {
    return new middlewares_1.AuthMiddleware(new adapters_1.JwtValidator());
}
exports.default = makeAuthMiddleware;
