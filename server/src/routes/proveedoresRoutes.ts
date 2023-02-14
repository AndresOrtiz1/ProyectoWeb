import { Router } from "express";

import proveedoresController from "../controllers/proveedoresController";
class InventoryRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', proveedoresController.list_proveedores );
        this.router.get('/:id', proveedoresController.getOne );
        this.router.post('/',proveedoresController.create);
        this.router.put('/:id',proveedoresController.update); 
        this.router.delete('/:id',proveedoresController.delete);       

    }


}

const inventoryRoutes = new InventoryRoutes();
export default inventoryRoutes.router;