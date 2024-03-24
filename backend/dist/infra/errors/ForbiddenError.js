"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = void 0;
class ForbiddenError extends Error {
    constructor(message = 'You are not allowed to perform this action') {
        super(message);
        this.name = 'FORBIDDEN';
    }
}
exports.ForbiddenError = ForbiddenError;
