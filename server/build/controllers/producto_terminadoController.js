"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.producto_terminadoController = void 0;
const database_1 = __importDefault(require("../database"));
class Producto_terminadoController {
    list_producto_terminado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [recetas] = yield database_1.default.query('SELECT * FROM recetas');
            const recetasConIngredientes = [];
            for (const receta of recetas) {
                const [ingredientes] = yield database_1.default.query('SELECT * FROM ingredientes WHERE receta_id = ?', [receta.id]);
                recetasConIngredientes.push({ receta, ingredientes });
            }
            res.json(recetasConIngredientes);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const receta = yield database_1.default.query('SELECT * FROM recetas WHERE id = ?', [id]);
            if (receta.length > 0) {
                const [ingredientes] = yield database_1.default.query('SELECT * FROM ingredientes WHERE receta_id = ?', [id]);
                res.json({ receta: receta[0], ingredientes });
            }
            else {
                res.status(404).json({ message: 'Receta no encontrada' });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, imagen, ingredientes } = req.body;
            const newReceta = {
                nombre,
                imagen,
            };
            const result = yield database_1.default.query('INSERT INTO recetas SET ?', [newReceta]);
            const recetaId = result.insertId;
            const newIngredientes = ingredientes.map((ingrediente) => {
                return [recetaId, ingrediente.materia_prima, ingrediente.cantidad, ingrediente.unidad_medida];
            });
            yield database_1.default.query('INSERT INTO ingredientes (receta_id, materia_prima, cantidad, unidad_medida) VALUES ?', [newIngredientes]);
            res.json({ message: 'Receta guardada' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { nombre, imagen, ingredientes } = req.body;
            const updatedReceta = {
                nombre,
                imagen,
            };
            yield database_1.default.query('UPDATE recetas SET ? WHERE id = ?', [updatedReceta, id]);
            yield database_1.default.query('DELETE FROM ingredientes WHERE receta_id = ?', [id]);
            const newIngredientes = ingredientes.map((ingrediente) => {
                return [id, ingrediente.materia_prima, ingrediente.cantidad, ingrediente.unidad_medida];
            });
            yield database_1.default.query('INSERT INTO ingredientes (receta_id, materia_prima, cantidad, unidad_medida) VALUES ?', [newIngredientes]);
            res.json({ message: 'Receta actualizada' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM recetas WHERE id = ?', [id]);
            res.json({ message: 'Receta eliminada' });
        });
    }
}
exports.producto_terminadoController = new Producto_terminadoController();
exports.default = exports.producto_terminadoController;
