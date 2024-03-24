"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpiredTokenError = void 0;
class ExpiredTokenError extends Error {
    constructor(message = 'Your token has expired. Login again.') {
        super(message);
        this.name = 'UNAUTHORIZED';
    }
}
exports.ExpiredTokenError = ExpiredTokenError;
