"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaProductRepository = void 0;
const prismaClient_1 = require("../database/prisma/prismaClient");
class PrismaProductRepository {
    prisma;
    constructor(prisma = prismaClient_1.prismaClient) {
        this.prisma = prisma;
    }
    async getAll() {
        return this.prisma.deliveryProduct.findMany();
    }
}
exports.PrismaProductRepository = PrismaProductRepository;
