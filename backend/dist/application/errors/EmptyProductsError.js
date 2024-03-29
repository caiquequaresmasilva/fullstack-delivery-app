"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyProductsError = void 0;
class EmptyProductsError extends Error {
    constructor(message = 'The list of products is empty') {
        super(message);
        this.name = 'BAD_REQUEST';
    }
}
exports.EmptyProductsError = EmptyProductsError;
