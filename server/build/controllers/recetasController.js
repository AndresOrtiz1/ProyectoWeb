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
Object.defineProperty(exports, "__esModule", { value: true });
exports.recetasController = void 0;
const RECETAS = [
    {
        id: 1,
        nombrereceta: "ChisC_Mora_Azul",
        ingredientes: [
            {
                producto: "mantequilla",
                cantidad: 2,
            },
            {
                producto: "azucar",
                cantidad: 1,
            },
            {
                producto: "leche condensada",
                cantidad: 2,
            },
            {
                producto: "galleta molida",
                cantidad: 3,
            },
            {
                producto: "mora azul",
                cantidad: 4,
            },
        ],
    },
    {
        id: 2,
        nombrereceta: "ChisC_Fresas",
        ingredientes: [
            {
                producto: "mantequilla",
                cantidad: 2,
            },
            {
                producto: "azucar",
                cantidad: 1,
            },
            {
                producto: "leche condensada",
                cantidad: 2,
            },
            {
                producto: "galleta molida",
                cantidad: 3,
            },
            {
                producto: "fresas",
                cantidad: 5,
            },
        ],
    },
    {
        id: 3,
        nombrereceta: "ChisC_Mracuya",
        ingredientes: [
            {
                producto: "mantequilla",
                cantidad: 2,
            },
            {
                producto: "azucar",
                cantidad: 1,
            },
            {
                producto: "leche condensada",
                cantidad: 2,
            },
            {
                producto: "galleta molida",
                cantidad: 3,
            },
            {
                producto: "maracuya",
                cantidad: 2,
            },
        ],
    },
];
class RecetasController {
    list_recetas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json(RECETAS);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const receta = RECETAS.find((receta) => receta.id === Number(id));
            if (!receta) {
                return res.status(404).json({ text: "Receta no encontrada" });
            }
            return res.json(receta);
        });
    }
}
exports.recetasController = new RecetasController();
exports.default = exports.recetasController;
