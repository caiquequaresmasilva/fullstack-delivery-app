"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../errors");
function roleGuard(role) {
    return (req, _res, next) => {
        const { role: requestRole } = req.user;
        if (requestRole === role) {
            return next();
        }
        next(new errors_1.ForbiddenError());
    };
}
exports.default = roleGuard;
