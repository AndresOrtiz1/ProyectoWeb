"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryController = void 0;
const database_1 = __importDefault(require("../database"));
class InventoryController {
    index(req, res) {
        database_1.default.query('DESCRIBE productos');
        res.json('productos');
    }
}
exports.inventoryController = new InventoryController();
exports.default = exports.inventoryController;
