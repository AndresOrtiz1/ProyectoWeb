import { Request, Response } from 'express';
import pool from '../database';

class Producto_terminadoController {

    public async list_producto_terminado(req: Request, res: Response){
        const [recetas] = await pool.query('SELECT * FROM recetas');
        const recetasConIngredientes = [];
    
        for (const receta of recetas) {
            const [ingredientes] = await pool.query('SELECT * FROM ingredientes WHERE receta_id = ?', [receta.id]);
            recetasConIngredientes.push({ receta, ingredientes });
        }
    
        res.json(recetasConIngredientes);
    }
    

    public async getOne(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const receta = await pool.query('SELECT * FROM recetas WHERE id = ?', [id]);

        if (receta.length > 0) {
            const [ingredientes] = await pool.query('SELECT * FROM ingredientes WHERE receta_id = ?', [id]);
            res.json({ receta: receta[0], ingredientes });
        } else {
            res.status(404).json({ message: 'Receta no encontrada' });
        }
    }

    public async create(req: Request, res: Response): Promise<void> {
        const { nombre, imagen, ingredientes } = req.body;

        const newReceta = {
            nombre,
            imagen,
        };

        const result = await pool.query('INSERT INTO recetas SET ?', [newReceta]);

        const recetaId = (result as any).insertId;


        const newIngredientes = ingredientes.map((ingrediente: any) => {
            return [recetaId, ingrediente.materia_prima, ingrediente.cantidad, ingrediente.unidad_medida];
        });

        await pool.query('INSERT INTO ingredientes (receta_id, materia_prima, cantidad, unidad_medida) VALUES ?', [newIngredientes]);

        res.json({ message: 'Receta guardada' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { nombre, imagen, ingredientes } = req.body;

        const updatedReceta = {
            nombre,
            imagen,
        };

        await pool.query('UPDATE recetas SET ? WHERE id = ?', [updatedReceta, id]);

        await pool.query('DELETE FROM ingredientes WHERE receta_id = ?', [id]);

        const newIngredientes = ingredientes.map((ingrediente: any) => {
            return [id, ingrediente.materia_prima, ingrediente.cantidad, ingrediente.unidad_medida];
        });

        await pool.query('INSERT INTO ingredientes (receta_id, materia_prima, cantidad, unidad_medida) VALUES ?', [newIngredientes]);

        res.json({ message: 'Receta actualizada' });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        await pool.query('DELETE FROM recetas WHERE id = ?', [id]);

        res.json({ message: 'Receta eliminada' });
    }

}

export const producto_terminadoController = new Producto_terminadoController();
export default producto_terminadoController;
