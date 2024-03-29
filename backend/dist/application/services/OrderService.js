"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
class OrderService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    NEXT_STATUS = {
        Pending: 'Preparing',
        Preparing: 'Moving',
        Moving: 'Delivered',
        Delivered: ''
    };
    async create(rawOrder) {
        if (!rawOrder.products.length) {
            throw new errors_1.EmptyProductsError();
        }
        const { id } = await this.repo.create(rawOrder);
        return {
            id,
        };
    }
    async getOrders({ userId, userField }) {
        return this.repo.getOrders({ userId, userField });
    }
    async getOrder({ userId, userField, orderId }) {
        const order = await this.repo.getOrder({ orderId, userId, userField });
        if (!order) {
            throw new errors_1.OrderNotFoundError();
        }
        return order;
    }
    async updateStatus({ userField, userId, orderId, status }) {
        const actualStatus = await this.repo.getStatus({
            userField,
            userId,
            orderId,
        });
        if (!actualStatus) {
            throw new errors_1.OrderNotFoundError();
        }
        const nextStatus = this.NEXT_STATUS[actualStatus];
        if (!nextStatus || nextStatus !== status) {
            throw new errors_1.StatusError();
        }
        await this.repo.updateStatus({ userField, userId, orderId, status });
    }
}
exports.default = OrderService;
