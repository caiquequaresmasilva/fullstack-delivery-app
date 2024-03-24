"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordEmailError = void 0;
class PasswordEmailError extends Error {
    constructor(message = 'Password or email incorrect') {
        super(message);
        this.name = 'BAD_REQUEST';
    }
}
exports.PasswordEmailError = PasswordEmailError;
