"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../../application/services");
const controllers_1 = require("../http/controllers");
const repositories_1 = require("../repositories");
function makeProductController() {
    const repo = new repositories_1.PrismaProductRepository();
    return new controllers_1.ProductController(new services_1.ProductService(repo));
}
exports.default = makeProductController;
