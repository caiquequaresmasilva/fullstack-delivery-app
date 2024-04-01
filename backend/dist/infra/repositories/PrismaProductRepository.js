"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaProductRepository = void 0;
const prismaClient_1 = __importDefault(require("../database/prisma/prismaClient"));
class PrismaProductRepository {
    prisma;
    constructor(prisma = prismaClient_1.default) {
        this.prisma = prisma;
    }
    async getAll() {
        return this.prisma.deliveryProduct.findMany();
    }
}
exports.PrismaProductRepository = PrismaProductRepository;
