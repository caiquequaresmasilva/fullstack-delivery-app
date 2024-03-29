"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const factories_1 = require("../../factories");
const middlewares_1 = require("../middlewares");
const userRoutes = (0, express_1.Router)();
const userController = (0, factories_1.makeUserController)();
const createUserGuard = (0, factories_1.makeCreateUserGuard)();
const authMiddleware = (0, factories_1.makeAuthMiddleware)();
userRoutes.post('/', (req, res, next) => createUserGuard.handle(req, res, next), middlewares_1.validationMiddleware, (req, res, next) => userController.create(req, res, next));
userRoutes.post('/login', (req, res, next) => userController.login(req, res, next));
userRoutes.use((req, res, next) => authMiddleware.handle(req, res, next));
userRoutes.use((req, res, next) => (0, middlewares_1.roleGuard)('admin')(req, res, next));
userRoutes.get('/', (req, res, next) => userController.getUsers(req, res, next));
userRoutes.delete('/:id', (req, res, next) => userController.delete(req, res, next));
exports.default = userRoutes;
