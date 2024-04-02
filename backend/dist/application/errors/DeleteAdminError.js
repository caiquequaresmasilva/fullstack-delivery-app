"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAdminError = void 0;
class DeleteAdminError extends Error {
    constructor(message = 'You are not allowed to perform this action') {
        super(message);
        this.name = 'FORBIDDEN';
    }
}
exports.DeleteAdminError = DeleteAdminError;
