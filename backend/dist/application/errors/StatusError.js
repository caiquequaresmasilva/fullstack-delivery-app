"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusError = void 0;
class StatusError extends Error {
    constructor(message = 'Incorrect status update attempt') {
        super(message);
        this.name = 'BAD_REQUEST';
    }
}
exports.StatusError = StatusError;
