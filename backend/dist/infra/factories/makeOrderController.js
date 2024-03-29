"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../../application/services");
const controllers_1 = require("../http/controllers");
const repositories_1 = require("../repositories");
function makeOrderController() {
    const repo = new repositories_1.PrismaOrderRepository();
    return new controllers_1.OrderController(new services_1.OrderService(repo));
}
exports.default = makeOrderController;
