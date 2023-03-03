import {Request, Response, text} from 'express';
 
import  pool  from '../database'; 

class ClientesController {

 
    public async list_clientes (req: Request, res: Response) {
        const [clientes] = await pool.query(' SELECT * FROM clientes  ');
        res.json(clientes);
    }

  

    public async getOne (req: Request, res: Response):  Promise<any> {
        const {id} = req.params;
        const [cliente] = await pool.query('SELECT * FROM clientes WHERE  id = ?',[id]);
        console.log(cliente);
        // res.json({text:'econtrado'});
        
        res.json(cliente);
    }
    
 
    
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
