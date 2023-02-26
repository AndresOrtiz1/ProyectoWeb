import { Request, Response, text } from "express";

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
  public async list_recetas(req: Request, res: Response) {
    res.json(RECETAS);
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const receta = RECETAS.find((receta) => receta.id === Number(id));
    if (!receta) {
      return res.status(404).json({ text: "Receta no encontrada" });
    }

    return res.json(receta);
  }
}

export const recetasController = new RecetasController();
export default recetasController;
