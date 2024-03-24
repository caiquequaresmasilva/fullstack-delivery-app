"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adapters_1 = require("../adapters");
const middlewares_1 = require("../http/middlewares");
function makeCreateUserGuard() {
    return new middlewares_1.CreateUserGuard(new adapters_1.JwtValidator());
}
exports.default = makeCreateUserGuard;
