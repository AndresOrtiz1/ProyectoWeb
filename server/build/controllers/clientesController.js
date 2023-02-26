"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientesController = void 0;
const database_1 = __importDefault(require("../database"));
class ClientesController {
    // public async list_materia_prima (req: Request, res: Response) {
    //     const [rows, fields] = await pool.query('SELECT * FROM materia_prima');
    //     /*const materia_prima = await pool.query('SELECT * FROM materia_prima');
    //     console.log(materia_prima);*/
    //     res.json(rows);
    // }
    list_clientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [clientes] = yield database_1.default.query(' SELECT * FROM clientes  ');
            res.json(clientes);
        });
    }
    // aun esta pendiente la confirmacion para que se pueda usar 
    // public async getOne (req: Request, res: Response):  Promise<any> {
    //     const {id} = req.params;
    //     const [rows, fields] = await pool.query('SELECT * FROM materia_prima WHERE id =?',[id]);
    //     console.log(rows);
    //     res.json({text:'econtrado' });
    // }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const [cliente] = yield database_1.default.query('SELECT * FROM clientes WHERE  id = ?', [id]);
            console.log(cliente);
            // res.json({text:'econtrado'});
            res.json(cliente);
        });
    }
    // public getOne(req: Request, res: Response){
    //     res.json({text: 'ide ingresado: '+ req.params.id})
    // }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO clientes set ? ', [req.body]);
            res.json({ message: 'nuevo cliente ingresado . ' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE clientes set ? WHERE id = ?', [req.body, id]);
            res.json({ message: ' se actualizo el elemento' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM clientes WHERE id = ?', [id]);
            res.json({ message: ' Se a eliminado un elemento' });
        });
    }
}
exports.clientesController = new ClientesController();
exports.default = exports.clientesController;
