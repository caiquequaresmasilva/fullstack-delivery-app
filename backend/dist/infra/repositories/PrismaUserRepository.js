"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
const prismaClient_1 = __importDefault(require("../database/prisma/prismaClient"));
class PrismaUserRepository {
    prisma;
    constructor(prisma = prismaClient_1.default) {
        this.prisma = prisma;
    }
    async delete(id) {
        await this.prisma.deliveryUser.delete({
            where: {
                id,
            },
        });
    }
    async getUsers() {
        return this.prisma.deliveryUser.findMany({
            where: {
                role: {
                    not: 'admin',
                },
            },
            select: {
                email: true,
                name: true,
                role: true,
                id: true,
            },
        });
    }
    async create(data) {
        const { id } = await this.prisma.deliveryUser.create({
            data: data.toJSON(),
        });
        return { id };
    }
    async findByUnique({ email, id }) {
        const user = await this.prisma.deliveryUser.findUnique({
            where: {
                email,
                id,
            },
        });
        return user ? new domain_1.User(user) : user;
    }
}
exports.default = PrismaUserRepository;
