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
            const response = await this.service.create({
                name,
                email,
                password,
                role,
            });
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
    async getUsers(_req, res, next) {
        try {
            const response = await this.service.getUsers();
            return res.status(enums_1.HttpStatus.OK).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        const { id } = req.params;
        try {
            await this.service.delete(id);
            return res.status(enums_1.HttpStatus.OK).json({ message: 'User deleted' });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = UserController;
