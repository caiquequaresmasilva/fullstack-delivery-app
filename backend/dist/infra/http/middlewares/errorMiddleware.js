"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../enums");
function errorMiddleware(err, _req, res, next) {
    const { name, message } = err;
    const status = enums_1.HttpStatus[name];
    res
        .status(status || enums_1.HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: message || enums_1.HttpStatus[500] });
}
exports.default = errorMiddleware;
