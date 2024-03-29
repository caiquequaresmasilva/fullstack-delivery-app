"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async getAll() {
        return this.repo.getAll();
    }
}
exports.default = ProductService;
