"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../enums");
class UserController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(req, res, next) {
        const { email, password, role, name } = req.body;
        try {
            const response = await this.service.create({ name, email, password, role });
            return res.status(enums_1.HttpStatus.CREATED).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        const { email, password } = req.body;
        try {
            const response = await this.service.login({ email, password });
            return res.status(enums_1.HttpStatus.OK).json(response);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = UserController;
