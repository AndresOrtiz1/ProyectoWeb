"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recetasController_1 = __importDefault(require("../controllers/recetasController"));
class InventoryRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', recetasController_1.default.list_recetas);
        this.router.get('/:id', recetasController_1.default.getOne);
    }
}
const inventoryRoutes = new InventoryRoutes();
exports.default = inventoryRoutes.router;
