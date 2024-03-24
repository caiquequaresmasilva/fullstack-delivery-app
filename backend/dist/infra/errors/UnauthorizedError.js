"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
class UnauthorizedError extends Error {
    constructor(message = 'Invalid authentication token') {
        super(message);
        this.name = 'UNAUTHORIZED';
    }
}
exports.UnauthorizedError = UnauthorizedError;
