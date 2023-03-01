import {Request, Response, text} from 'express';

import  pool  from '../database';

class ProveedoresController {

    public async list_proveedores (req: Request, res: Response) {
        const [proveedores] = await pool.query(' SELECT * FROM proveedores');
        res.json(proveedores);
        res.json({message: ' Proveedrores escontrados'})
    }

    public async getOne (req: Request, res: Response):  Promise<any> {
        const {id} = req.params;
        const [proveedor] = await pool.query('SELECT * FROM proveedores WHERE  id = ?',[id]);
        console.log(proveedor);
        res.json({text:'producto encontrado'});
        
        res.json(proveedor);
    }
    
    public async create (req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO proveedores set ? ', [req.body] )
        res.json({message:'nuevo proveedor ingresaso . '})
        
    }
    
    public async update (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE proveedores set ? WHERE id = ?',[req.body , id]);
        res.json({message: ' se actualizo el elemento'})
    }
    
    
    public async delete (req: Request, res: Response) {
        const { id } = req.params;
        await pool.query('DELETE FROM proveedores WHERE id = ?',[id]);
        res.json({message: ' Se a eliminado un elemento' })
    }
      

}

export const proveedoresController = new ProveedoresController();
export default proveedoresController;