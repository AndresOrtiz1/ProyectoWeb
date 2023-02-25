import { Router } from "express";

import clientesController from "../controllers/clientesController";
class InventoryRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', clientesController.list_clientes );
        this.router.get('/:id', clientesController.getOne );
        this.router.post('/',clientesController.create);
        this.router.put('/:id',clientesController.update); 
        this.router.delete('/:id',clientesController.delete);       

    }


}

const inventoryRoutes = new InventoryRoutes();
export default inventoryRoutes.router;    