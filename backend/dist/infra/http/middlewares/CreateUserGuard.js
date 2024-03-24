"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../errors");
const enums_1 = require("../../enums");
class CreateUserGuard {
    token;
    constructor(token) {
        this.token = token;
    }
    async handle(req, res, next) {
        const { role } = req.body;
        const bearerToken = req.headers.authorization || '';
        const token = bearerToken.split(' ')[1] || '';
        if (role === enums_1.Roles.ADMIN) {
            return next(new errors_1.ForbiddenError());
        }
        if (role === enums_1.Roles.SELLER) {
            try {
                const { role: requestRole } = this.token.validate(token);
                if (requestRole !== enums_1.Roles.ADMIN) {
                    return next(new errors_1.ForbiddenError());
                }
                return next();
            }
            catch (error) {
                return next(error);
            }
        }
        next();
    }
}
exports.default = CreateUserGuard;
