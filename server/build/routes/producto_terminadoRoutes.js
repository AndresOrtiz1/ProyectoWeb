"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const producto_terminadoController_1 = __importDefault(require("../controllers/producto_terminadoController"));
class InventoryRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', producto_terminadoController_1.default.list_producto_terminado);
        this.router.get('/:id_terminado', producto_terminadoController_1.default.getOne);
        this.router.post('/', producto_terminadoController_1.default.create);
        this.router.put('/:id_terminado', producto_terminadoController_1.default.update);
        this.router.delete('/:id_terminado', producto_terminadoController_1.default.delete);
    }
}
const inventoryRoutes = new InventoryRoutes();
exports.default = inventoryRoutes.router;
