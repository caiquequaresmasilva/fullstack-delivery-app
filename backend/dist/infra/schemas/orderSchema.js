"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.orderSchema = joi_1.default.object({
    sellerId: joi_1.default.string().uuid().required().messages({
        'string.base': '"sellerId" should be a string',
        'any.required': '"sellerId" is required',
        'string.guid': '"sellerId" must be a valid uuid'
    }),
    deliveryAddress: joi_1.default.string().required().messages({
        'string.base': '"deliveryAddress" should be a string',
        'any.required': '"deliveryAddress" is required',
    }),
    deliveryNumber: joi_1.default.string().required().messages({
        'string.base': '"deliveryNumber" should be a string',
        'any.required': '"deliveryNumber" is required',
    }),
    totalPrice: joi_1.default.number().positive().required().messages({
        'number.base': '"totalPrice" should be a number',
        'number.positive': '"totalPrice" must be positive',
        'any.required': '"totalPrice" is required',
    }),
    products: joi_1.default.array().items(joi_1.default.object({
        id: joi_1.default.string().uuid().required(),
        quantity: joi_1.default.number().positive().integer().required()
    })).required().messages({
        'any.required': '"products" is required',
        'array.base': '"products" must be an array',
        'array.includes': '"products" must contain valid information'
    })
}).options({ abortEarly: false });
