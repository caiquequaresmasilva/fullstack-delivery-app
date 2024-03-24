"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = void 0;
const schemas_1 = require("../../schemas");
const enums_1 = require("../../enums");
async function validationMiddleware(req, res, next) {
    const { email, password, role, name } = req.body;
    const { error } = schemas_1.userSchema.validate({ role, email, password, name });
    if (error) {
        res.status(enums_1.HttpStatus.BAD_REQUEST).json({ error: error.message });
    }
    else {
        next();
    }
}
exports.validationMiddleware = validationMiddleware;
