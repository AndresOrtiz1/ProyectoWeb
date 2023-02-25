import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';
import inventoryRoutes from './routes/inventoryRoutes';
import materia_primaRoutes from './routes/materia_primaRoutes';
import proveedoresRoutes from './routes/proveedoresRoutes';
import clientesRoutes from './routes/proveedoresRoutes';
class Server{

    public app: express.Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void{
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false})); 
    }

    routes(): void{
        this.app.use('/', indexRoutes);
        this.app.use('/api/inventario', inventoryRoutes);    
        this.app.use('/api/materia-prima', materia_primaRoutes);    
        this.app.use('/api/proveedores', proveedoresRoutes);
        this.app.use('/api/clientes', clientesRoutes);
    }

    start(): void{
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();