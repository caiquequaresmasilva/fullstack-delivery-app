"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
class AuthMiddleware {
    token;
    constructor(token) {
        this.token = token;
    }
    async handle(req, res, next) {
        const bearerToken = req.headers.authorization || '';
        const token = bearerToken.split(' ')[1] || '';
        try {
            const { role, email, id, name } = this.token.validate(token);
            req.user = { name, email, id, role };
            return next();
        }
        catch (error) {
            return next(error);
        }
    }
}
exports.AuthMiddleware = AuthMiddleware;
