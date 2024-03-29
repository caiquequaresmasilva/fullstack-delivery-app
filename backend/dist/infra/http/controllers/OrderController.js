"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../enums");
class OrderController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(req, res, next) {
        const { id: customerId } = req.user;
        const { sellerId, deliveryAddress, deliveryNumber, totalPrice, products } = req.body;
        try {
            const response = await this.service.create({
                customerId,
                sellerId,
                deliveryAddress,
                deliveryNumber,
                totalPrice,
                products,
            });
            return res.status(enums_1.HttpStatus.CREATED).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async getOrders(req, res, next) {
        const { role, id: userId } = req.user;
        try {
            const response = await this.service.getOrders({
                userField: `${role}Id`,
                userId,
            });
            return res.status(enums_1.HttpStatus.OK).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async getOrder(req, res, next) {
        const { role, id: userId } = req.user;
        const { id: orderId } = req.params;
        try {
            const response = await this.service.getOrder({
                orderId: Number(orderId),
                userField: `${role}Id`,
                userId,
            });
            return res.status(enums_1.HttpStatus.OK).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async updateStatus(req, res, next) {
        const { role, id: userId } = req.user;
        const { id: orderId } = req.params;
        const { status } = req.body;
        try {
            const response = await this.service.updateStatus({
                orderId: Number(orderId),
                userField: `${role}Id`,
                userId,
                status,
            });
            return res.status(enums_1.HttpStatus.OK).json({ message: 'Order updated' });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = OrderController;
