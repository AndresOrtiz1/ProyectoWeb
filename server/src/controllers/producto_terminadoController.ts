import {Request, Response, text} from 'express';

import  pool  from '../database';

class Producto_terminadoController {

    
    // public async list_materia_prima (req: Request, res: Response) {
    //     const [rows, fields] = await pool.query('SELECT * FROM materia_prima');
    //     /*const materia_prima = await pool.query('SELECT * FROM materia_prima');
    //     console.log(materia_prima);*/
    //     res.json(rows);
    // }

    public async list_producto_terminado (req: Request, res: Response) {
        const [producto_terminado] = await pool.query(' SELECT * FROM productos_terminados  ');
        res.json(producto_terminado);
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
        const [producto_terminado] = await pool.query('SELECT * FROM productos_terminados WHERE  id = ?',[id]);
        console.log(producto_terminado);
        // res.json({text:'econtrado'});
        
        res.json(producto_terminado);
    }
    
    // public getOne(req: Request, res: Response){
    //     res.json({text: 'ide ingresado: '+ req.params.id})

    // }
    
    public async create (req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO productos_terminados set ? ', [req.body] )
        res.json({message:'nuevo producto terminado ingresaso . '})
        
    }
    
    public async update (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE productos_terminados set ? WHERE id = ?',[req.body , id]);
        res.json({message: ' se actualizo el elemento'})
    }
    
    
    public async delete (req: Request, res: Response) {
        const { id } = req.params;
        await pool.query('DELETE FROM productos_terminados WHERE id = ?',[id]);
        res.json({message: ' Se a eliminado un elemento' })
    }
      

}

export const producto_terminadoController = new Producto_terminadoController();
export default producto_terminadoController;