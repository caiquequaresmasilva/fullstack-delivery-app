"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtValidator = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const errors_1 = require("../errors");
class JwtValidator {
    validate(token) {
        try {
            return (0, jsonwebtoken_1.verify)(token, process.env.TOKEN_SECRET);
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.TokenExpiredError) {
                throw new errors_1.ExpiredTokenError();
            }
            throw new errors_1.UnauthorizedError();
        }
    }
}
exports.JwtValidator = JwtValidator;
