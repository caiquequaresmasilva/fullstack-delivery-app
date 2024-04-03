"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
const errors_1 = require("../errors");
class UserService {
    repo;
    token;
    hash;
    constructor(repo, token, hash) {
        this.repo = repo;
        this.token = token;
        this.hash = hash;
    }
    _makeResponse({ email, name, role, id }) {
        return {
            name,
            token: this.token.generate({ name, email, role, id }),
            role,
        };
    }
    async create({ email, password, role, name, }) {
        const userCheck = await this.repo.findByUnique({ email });
        if (userCheck) {
            throw new errors_1.UserAlreadyExistsError();
        }
        const toCreate = new domain_1.User({
            name,
            email,
            role,
            password: await this.hash.generate(password),
        });
        const { id } = await this.repo.create(toCreate);
        return this._makeResponse({ name, email, role, id });
    }
    async login({ email, password }) {
        const user = await this.repo.findByUnique({ email });
        if (!user || !(await this.hash.compare(password, user.hashedPassword))) {
            throw new errors_1.PasswordEmailError();
        }
        return this._makeResponse({
            name: user.name,
            email,
            role: user.role,
            id: user.id,
        });
    }
    async getUsers() {
        return this.repo.getUsers();
    }
    async delete(id) {
        const user = await this.repo.findByUnique({ id });
        if (!user) {
            throw new errors_1.UserNotFoundError();
        }
        if (user.role === 'admin') {
            throw new errors_1.DeleteAdminError();
        }
        await this.repo.delete(id);
    }
}
exports.default = UserService;
