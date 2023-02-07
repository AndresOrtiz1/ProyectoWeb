"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const materia_primaController_1 = __importDefault(require("../controllers/materia_primaController"));
class InventoryRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', materia_primaController_1.default.list_materia_prima);
        this.router.get('/:id', materia_primaController_1.default.getOne);
        this.router.post('/', materia_primaController_1.default.create);
        this.router.put('/:id', materia_primaController_1.default.update);
        this.router.delete('/:id', materia_primaController_1.default.delete);
    }
}
const inventoryRoutes = new InventoryRoutes();
exports.default = inventoryRoutes.router;
