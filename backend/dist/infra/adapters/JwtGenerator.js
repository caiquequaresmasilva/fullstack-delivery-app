"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtGenerator = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
class JwtGenerator {
    generate(payload) {
        return (0, jsonwebtoken_1.sign)(payload, process.env.TOKEN_SECRET, {
            algorithm: 'HS256',
            expiresIn: '1d',
        });
    }
}
exports.JwtGenerator = JwtGenerator;
