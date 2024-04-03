"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./http/routes");
const middlewares_1 = require("./http/middlewares");
const swagger_json_1 = __importDefault(require("../infra/http/doc/swagger.json"));
class App {
    app;
    constructor() {
        this.app = (0, express_1.default)();
        this._config();
        this.setRoutes();
    }
    _config() {
        const accessControl = (_req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PATCH,PUT');
            res.header('Access-Control-Allow-Headers', '*');
            next();
        };
        this.app.use(accessControl);
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static('public'));
        this.app.use((0, morgan_1.default)('common', { skip: (req, res) => process.env.NODE_ENV === 'test' }));
        this.app.use('/doc', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default, {
            customJs: "'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.6.3/swagger-ui-bundle.min.js'",
            customCssUrl: "'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.6.3/swagger-ui.min.css'"
        }));
    }
    setRoutes() {
        this.app.use('/user', routes_1.userRoutes);
        this.app.use('/product', routes_1.productRoutes);
        this.app.use('/order', routes_1.orderRoutes);
        this.app.get('/', (_req, res) => {
            res.redirect('doc');
        });
        this.app.use(middlewares_1.errorMiddleware);
    }
    start(PORT) {
        this.app.listen(PORT, () => console.log(`API Running on port ${PORT}`));
    }
}
exports.default = App;
exports.app = new App().app;
