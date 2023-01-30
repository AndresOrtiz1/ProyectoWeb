import { Router } from "express";

import  inventoryController from "../controllers/inventoryController";
class InventoryRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', inventoryController.index );
    }

}

const inventoryRoutes = new InventoryRoutes();
export default inventoryRoutes.router;