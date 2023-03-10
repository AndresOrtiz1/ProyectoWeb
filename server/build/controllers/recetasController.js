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
        "id": 1,
        "nombrereceta": "Pizza",
        "ingredientes": [
            {
                "producto": "Harina",
                "cantidad": 1
            },
            {
                "producto": "tomate riñon",
                "cantidad": 1
            },
            {
                "producto": "Queso mozarella",
                "cantidad": 1
            },
            {
                "producto": "Jamón",
                "cantidad": 2
            },
            {
                "producto": "pasta de tomate",
                "cantidad": 1
            },
            {
                "producto": "levadura",
                "cantidad": 1
            },
            {
                "producto": "aceite",
                "cantidad": 1
            }
        ]
    },
    {
        "id": 2,
        "nombrereceta": "Lasaña de Carne",
        "ingredientes": [
            {
                "producto": "Mantequilla",
                "cantidad": 1
            },
            {
                "producto": "Queso mozarella",
                "cantidad": 1
            },
            {
                "producto": "Apio",
                "cantidad": 1
            },
            {
                "producto": "Pimiento verde",
                "cantidad": 1
            },
            {
                "producto": "Pimiento rojo",
                "cantidad": 1
            },
            {
                "producto": "pasta de tomate",
                "cantidad": 1
            },
            {
                "producto": "Ajo",
                "cantidad": 2
            },
            {
                "producto": "Harina",
                "cantidad": 1
            },
            {
                "producto": "Leche evaporada",
                "cantidad": 1
            },
            {
                "producto": "Cebolla perla",
                "cantidad": 1
            },
            {
                "producto": "Salsa de tomate",
                "cantidad": 1
            },
            {
                "producto": "Carne de Res molida",
                "cantidad": 3
            },
            {
                "producto": "Pasta para Lasaña",
                "cantidad": 1
            }
        ]
    },
    {
        "id": 3,
        "nombrereceta": "Lasaña de Pollo",
        "ingredientes": [
            {
                "producto": "Mantequilla",
                "cantidad": 1
            },
            {
                "producto": "Queso mozarella",
                "cantidad": 1
            },
            {
                "producto": "Apio",
                "cantidad": 1
            },
            {
                "producto": "Pimiento verde",
                "cantidad": 1
            },
            {
                "producto": "Pimiento rojo",
                "cantidad": 1
            },
            {
                "producto": "pasta de tomate",
                "cantidad": 1
            },
            {
                "producto": "Ajo",
                "cantidad": 2
            },
            {
                "producto": "Harina",
                "cantidad": 1
            },
            {
                "producto": "Leche evaporada",
                "cantidad": 1
            },
            {
                "producto": "Cebolla perla",
                "cantidad": 1
            },
            {
                "producto": "Salsa de tomate",
                "cantidad": 1
            },
            {
                "producto": "Pollo",
                "cantidad": 3
            },
            {
                "producto": "Pasta para Lasaña",
                "cantidad": 1
            }
        ]
    },
    {
        "id": 4,
        "nombrereceta": "Pasta Boloñesa",
        "ingredientes": [
            {
                "producto": "mantequilla",
                "cantidad": 1
            },
            {
                "producto": "aceite",
                "cantidad": 1
            },
            {
                "producto": "cebolla perla",
                "cantidad": 1
            },
            {
                "producto": "Carne de Res molida",
                "cantidad": 3
            },
            {
                "producto": "pasta de tomate",
                "cantidad": 2
            },
            {
                "producto": "spaghetti",
                "cantidad": 1
            }
        ]
    }
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
