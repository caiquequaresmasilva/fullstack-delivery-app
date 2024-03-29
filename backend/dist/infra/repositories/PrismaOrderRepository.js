"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = require("../database/prisma/prismaClient");
class PrismaOrderRepository {
    prisma;
    constructor(prisma = prismaClient_1.prismaClient) {
        this.prisma = prisma;
    }
    _mapProductsToDb(products) {
        return products.map(({ id, quantity }) => ({ productId: id, quantity }));
    }
    _mapOrderToDomain({ customer, seller, status, saleDate, products, totalPrice, }) {
        return {
            status,
            saleDate,
            totalPrice,
            customer: customer.name,
            seller: seller.name,
            products: products.map(({ quantity, product: { name, price } }) => ({
                name,
                price,
                quantity,
            })),
        };
    }
    async create({ customerId, deliveryAddress, deliveryNumber, sellerId, totalPrice, products, }) {
        const { id } = await this.prisma.deliveryOrder.create({
            data: {
                customerId,
                sellerId,
                deliveryAddress,
                deliveryNumber,
                totalPrice,
                products: {
                    createMany: {
                        data: this._mapProductsToDb(products),
                    },
                },
            },
        });
        return { id };
    }
    async getOrders({ userField, userId, }) {
        return this.prisma.deliveryOrder.findMany({
            where: {
                [userField]: userId,
            },
            select: {
                id: true,
                totalPrice: true,
                deliveryAddress: true,
                deliveryNumber: true,
                saleDate: true,
                status: true,
            },
        });
    }
    async getOrder({ orderId, userField, userId, }) {
        const order = await this.prisma.deliveryOrder.findUnique({
            where: {
                id: orderId,
                [userField]: userId,
            },
            select: {
                totalPrice: true,
                saleDate: true,
                status: true,
                products: {
                    select: {
                        quantity: true,
                        product: {
                            select: {
                                name: true,
                                price: true,
                            },
                        },
                    },
                },
                customer: {
                    select: {
                        name: true,
                    },
                },
                seller: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        return order ? this._mapOrderToDomain(order) : null;
    }
    async updateStatus({ userField, userId, orderId, status, }) {
        await this.prisma.deliveryOrder.update({
            where: {
                id: orderId,
                [userField]: userId,
            },
            data: {
                status,
            },
        });
    }
    async getStatus({ userField, userId, orderId, }) {
        const order = await this.prisma.deliveryOrder.findUnique({
            where: {
                id: orderId,
                [userField]: userId,
            },
        });
        return order ? order.status : null;
    }
}
exports.default = PrismaOrderRepository;
