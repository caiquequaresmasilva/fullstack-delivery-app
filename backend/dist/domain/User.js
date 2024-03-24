"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    props;
    constructor(props) {
        this.props = props;
    }
    get name() {
        return this.props.name;
    }
    get email() {
        return this.props.email;
    }
    get role() {
        return this.props.role;
    }
    get hashedPassword() {
        return this.props.password;
    }
    get id() {
        return this.props.id || '';
    }
    toJSON() {
        return this.props;
    }
}
exports.User = User;
