import {Request, Response, text} from 'express';

import  pool  from '../database';

class ProveedoresController {

    
    // public async list_materia_prima (req: Request, res: Response) {
    //     const [rows, fields] = await pool.query('SELECT * FROM materia_prima');
    //     /*const materia_prima = await pool.query('SELECT * FROM materia_prima');
    //     console.log(materia_prima);*/
    //     res.json(rows);
    // }

    public async list_proveedores (req: Request, res: Response) {
        const [proveedores] = await pool.query(' SELECT * FROM proveedores  ');
        res.json(proveedores);
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
        const [proveedor] = await pool.query('SELECT * FROM proveedores WHERE  id = ?',[id]);
        console.log(proveedor);
        // res.json({text:'econtrado'});
        
        res.json(proveedor);
    }
    
    // public getOne(req: Request, res: Response){
    //     res.json({text: 'ide ingresado: '+ req.params.id})

    // }
    
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