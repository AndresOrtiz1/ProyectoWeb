import {Request, Response} from 'express';

import  pool  from '../database';

class InventoryController {
    public index (req: Request, res: Response) {
        pool.query('DESCRIBE inventarios_productos_db')
    }
}

export const inventoryController = new InventoryController();
export default inventoryController;