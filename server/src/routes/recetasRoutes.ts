import { Router } from "express";

import recetasController from "../controllers/recetasController";
class InventoryRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', recetasController.list_recetas );
        this.router.get('/:id', recetasController.getOne );
    }
}

const inventoryRoutes = new InventoryRoutes();
export default inventoryRoutes.router;    