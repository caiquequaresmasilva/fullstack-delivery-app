"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
class BcryptHashManager {
    async generate(str) {
        const salt = await (0, bcryptjs_1.genSalt)(10);
        return (0, bcryptjs_1.hash)(str, salt);
    }
    async compare(str, hash) {
        return (0, bcryptjs_1.compare)(str, hash);
    }
}
exports.default = BcryptHashManager;
