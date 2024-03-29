"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderNotFoundError = void 0;
class OrderNotFoundError extends Error {
    constructor(message = 'Order not found') {
        super(message);
        this.name = 'NOT_FOUND';
    }
}
exports.OrderNotFoundError = OrderNotFoundError;
