"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusMiddleware = void 0;
const errors_1 = require("../../errors");
async function statusMiddleware(req, res, next) {
    const { status } = req.body;
    const { role } = req.user;
    if (role === 'seller' && status === "Delivered") {
        return next(new errors_1.ForbiddenError());
    }
    if (role === 'customer' && status !== "Delivered") {
        return next(new errors_1.ForbiddenError());
    }
    next();
}
exports.statusMiddleware = statusMiddleware;
