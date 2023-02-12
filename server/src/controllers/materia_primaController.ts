import {Request, Response, text} from 'express';

import  pool  from '../database';

class Materia_primaController {

    
    // public async list_materia_prima (req: Request, res: Response) {
    //     const [rows, fields] = await pool.query('SELECT * FROM materia_prima');
    //     /*const materia_prima = await pool.query('SELECT * FROM materia_prima');
    //     console.log(materia_prima);*/
    //     res.json(rows);
    // }

    public async list_materia_prima (req: Request, res: Response) {
        const [materia_prima] = await pool.query(' SELECT * FROM materia_prima  ');
        res.json(materia_prima);
    }

    // aun esta pendiente la confirmacion para que se pueda usar 
    

    // public async getOne (req: Request, res: Response):  Promise<any> {
    //     const {id} = req.params;
    //     const [rows, fields] = await pool.query('SELECT * FROM materia_prima WHERE id =?',[id]);
    //     console.log(rows);
    //     res.json({text:'econtrado' });
    // }

    public async getOne (req: Request, res: Response):  Promise<any> {
        const {id} = req.params;
        const [materia] = await pool.query('SELECT * FROM materia_prima WHERE  id = ?',[id]);
        console.log(materia);
        // res.json({text:'econtrado'});
        
        res.json(materia);
    }
    
    // public getOne(req: Request, res: Response){
    //     res.json({text: 'ide ingresado: '+ req.params.id})

    // }
    
    public async create (req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO materia_prima set ? ', [req.body] )
        res.json({message:'nuevo material ingresaso . '})
        
    }
    
    public async update (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE materia_prima set ? WHERE id = ?',[req.body , id]);
        res.json({message: ' se actualizo el elemento'})
    }
    
    
    public async delete (req: Request, res: Response) {
        const { id } = req.params;
        await pool.query('DELETE FROM materia_prima WHERE id = ?',[id]);
        res.json({message: ' Se a eliminado un elemento' })
    }
      

}

export const materia_primaController = new Materia_primaController();
export default materia_primaController;
