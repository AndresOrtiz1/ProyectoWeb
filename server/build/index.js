"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const inventoryRoutes_1 = __importDefault(require("./routes/inventoryRoutes"));
const materia_primaRoutes_1 = __importDefault(require("./routes/materia_primaRoutes"));
const proveedoresRoutes_1 = __importDefault(require("./routes/proveedoresRoutes"));
const clientesRoutes_1 = __importDefault(require("./routes/clientesRoutes"));
const producto_terminadoRoutes_1 = __importDefault(require("./routes/producto_terminadoRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/inventario', inventoryRoutes_1.default);
        this.app.use('/api/materia-prima', materia_primaRoutes_1.default);
        this.app.use('/api/proveedores', proveedoresRoutes_1.default);
        this.app.use('/api/clientes', clientesRoutes_1.default);
        this.app.use('/api/producto_terminado', producto_terminadoRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
