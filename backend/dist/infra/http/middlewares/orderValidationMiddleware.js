"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidationMiddleware = void 0;
const schemas_1 = require("../../schemas");
const enums_1 = require("../../enums");
async function orderValidationMiddleware(req, res, next) {
    const { sellerId, products, deliveryAddress, deliveryNumber, totalPrice } = req.body;
    const { error } = schemas_1.orderSchema.validate({
        sellerId,
        products,
        deliveryAddress,
        deliveryNumber,
        totalPrice,
    });
    if (error) {
        res.status(enums_1.HttpStatus.BAD_REQUEST).json({ error: error.message });
    }
    else {
        next();
    }
}
exports.orderValidationMiddleware = orderValidationMiddleware;
