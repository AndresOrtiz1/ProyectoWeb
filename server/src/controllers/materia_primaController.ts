import {Request, Response} from 'express';

import  pool  from '../database';

class Materia_primaController {

    public async list_materia_prima (req: Request, res: Response) {
        const materia_prima = await pool.query(' SELECT * FROM materia_prima ');
        res.json(materia_prima);
    }

    // aun esta pendiente la confirmacion para que se pueda usar 
    public async getOne (req: Request, res: Response):  Promise<any> {
        const {id} = req.params;
        const materia_prima = await pool.query ('SELEC * FROM materia_prima WHERE id= ?', [id]);
        //verificacion de existencial del elemento
        if (materia_prima.length > 0){
            return res.json(materia_prima[0]);
        }
        res.status(404).json({Text:'El elemento no existe'})
    }
    
    public async creat (req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO materia_prima set ?', [req.body] )
        res.json({message:'nuevo material ingresaso.'})
        
    }
    
    public async update (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE materia_prima set ? WHERE id = ? ',[req.body , id]);
        res.json({message: ' se actualizo el elemento' })
    }

    public async delete (req: Request, res: Response) {
        const { id } = req.params;
        await pool.query('DELETE FROM materia_prima WHERE id = ?',[id]);
        res.json({message: ' Se a eliminado un elemento' })
    }
      

}

export const materia_primaController = new Materia_primaController();
export default materia_primaController;