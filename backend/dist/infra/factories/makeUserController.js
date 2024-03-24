"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("../../application/services/UserService"));
const adapters_1 = require("../adapters");
const controllers_1 = require("../http/controllers");
const repositories_1 = require("../repositories");
function makeUserController() {
    const service = new UserService_1.default(new repositories_1.PrismaUserRepository(), new adapters_1.JwtGenerator(), new adapters_1.BcryptHashManager());
    return new controllers_1.UserController(service);
}
exports.default = makeUserController;
