"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAlreadyExistsError = void 0;
class UserAlreadyExistsError extends Error {
    constructor(message = 'User already exists') {
        super(message);
        this.name = 'BAD_REQUEST';
    }
}
exports.UserAlreadyExistsError = UserAlreadyExistsError;
