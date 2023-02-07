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
exports.materia_primaController = void 0;
const database_1 = __importDefault(require("../database"));
class Materia_primaController {
    list_materia_prima(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const materia_prima = yield database_1.default.query(' SELECT * FROM materia_prima ');
            res.json(materia_prima);
        });
    }
    // aun esta pendiente la confirmacion para que se pueda usar 
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const materia_prima = yield database_1.default.query('SELEC * FROM materia_prima WHERE id= ?', [id]);
            //verificacion de existencial del elemento
            if (materia_prima.length > 0) {
                return res.json(materia_prima[1][0]);
            }
            res.status(404).json({ Text: 'El elemento no existe' });
        });
    }
    creat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO materia_prima set ?', [req.body]);
            res.json({ message: 'nuevo material ingresaso.' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE materia_prima set ? WHERE id = ? ', [req.body, id]);
            res.json({ message: ' se actualizo el elemento' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM materia_prima WHERE id = ?', [id]);
            res.json({ message: ' Se a eliminado un elemento' });
        });
    }
}
exports.materia_primaController = new Materia_primaController();
exports.default = exports.materia_primaController;
