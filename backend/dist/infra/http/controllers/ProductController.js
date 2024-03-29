"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../enums");
class ProductController {
    service;
    constructor(service) {
        this.service = service;
    }
    async getAll(req, res, next) {
        try {
            const response = await this.service.getAll();
            return res.status(enums_1.HttpStatus.OK).json(response);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = ProductController;
