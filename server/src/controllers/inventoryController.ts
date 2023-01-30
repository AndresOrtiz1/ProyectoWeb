import {Request, Response} from 'express';

import  pool  from '../database';

class InventoryController {
    public index (req: Request, res: Response) {
        pool.query('DESCRIBE productos');
        res.json('productos');
    }
}

export const inventoryController = new InventoryController();
export default inventoryController;