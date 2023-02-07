import { Router } from "express";

import materia_primaController from "../controllers/materia_primaController";
class InventoryRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', materia_primaController.list_materia_prima );
        this.router.get('/:id', materia_primaController.getOne );
        this.router.post('/',materia_primaController.create);
        this.router.put('/:id',materia_primaController.update); 
        this.router.delete('/:id',materia_primaController.delete);       

    }


}

const inventoryRoutes = new InventoryRoutes();
export default inventoryRoutes.router;    