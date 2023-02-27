import { Request, Response, text } from "express";

const RECETAS =[
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
]
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
