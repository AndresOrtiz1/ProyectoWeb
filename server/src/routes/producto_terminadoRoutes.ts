import { Router } from "express";

import producto_terminadoController from "../controllers/producto_terminadoController";
class InventoryRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', producto_terminadoController.list_producto_terminado );
        this.router.get('/:id', producto_terminadoController.getOne );
        this.router.post('/',producto_terminadoController.create);
        this.router.put('/:id',producto_terminadoController.update); 
        this.router.delete('/:id',producto_terminadoController.delete);       

    }


}

const inventoryRoutes = new InventoryRoutes();
export default inventoryRoutes.router;