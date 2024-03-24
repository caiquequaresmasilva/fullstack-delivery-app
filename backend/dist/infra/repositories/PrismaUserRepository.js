"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
const prismaClient_1 = require("../database/prisma/prismaClient");
class PrismaUserRepository {
    prisma;
    constructor(prisma = prismaClient_1.prismaClient) {
        this.prisma = prisma;
    }
    async create(data) {
        const { id } = await this.prisma.deliveryUser.create({
            data: data.toJSON(),
        });
        return { id };
    }
    async findByEmail(email) {
        const user = await this.prisma.deliveryUser.findUnique({
            where: {
                email,
            },
        });
        return user ? new domain_1.User(user) : user;
    }
}
exports.default = PrismaUserRepository;
