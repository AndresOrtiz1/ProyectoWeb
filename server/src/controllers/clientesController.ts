import {Request, Response, text} from 'express';

import  pool  from '../database';

class ClientesController {

    
    // public async list_materia_prima (req: Request, res: Response) {
    //     const [rows, fields] = await pool.query('SELECT * FROM materia_prima');
    //     /*const materia_prima = await pool.query('SELECT * FROM materia_prima');
    //     console.log(materia_prima);*/
    //     res.json(rows);
    // }

    public async list_clientes (req: Request, res: Response) {
        const [clientes] = await pool.query(' SELECT * FROM clientes  ');
        res.json(clientes);
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
        const [cliente] = await pool.query('SELECT * FROM clientes WHERE  id = ?',[id]);
        console.log(cliente);
        // res.json({text:'econtrado'});
        
        res.json(cliente);
    }
    
    // public getOne(req: Request, res: Response){
    //     res.json({text: 'ide ingresado: '+ req.params.id})

    // }
    
    public async create (req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO clientes set ? ', [req.body] )
        res.json({message:'nuevo cliente ingresado . '})
        
    }
    
    public async update (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE clientes set ? WHERE id = ?',[req.body , id]);
        res.json({message: ' se actualizo el elemento'})
    }
    
    
    public async delete (req: Request, res: Response) {
        const { id } = req.params;
        await pool.query('DELETE FROM clientes WHERE id = ?',[id]);
        res.json({message: ' Se a eliminado un elemento' })
    }
      

}

export const clientesController = new ClientesController();
export default clientesController;
