import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent} from './components/login/login.component'
import { MateriaPrimaComponent } from './components/materia-prima/materia-prima.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import {ClientesComponent} from './components/clientes/clientes.component'
import { ProductoTerminadoComponent } from './components/producto-terminado/producto-terminado.component';


//definicion de rutas 
const routes: Routes = [
  //rutas para para la navegacion 
  //ruta inicial
  {
    path: '',
    redirectTo: '/Login',
    pathMatch: 'full'
  },
  {
    path:'Login',
    component: LoginComponent
  },
  //ruta para materias primas
  {
    path: 'http://localhost:4200/materia-prima',
    redirectTo: '/materia-prima',
    pathMatch: 'full'
  },
  {
    path:'materia-prima',
    component: MateriaPrimaComponent
  },

  //ruta para proveedores
  {
    path: 'http://localhost:4200/proveedores',
    redirectTo: '/proveedores',
    pathMatch: 'full'
  },
  {
    path:'proveedores',
    component: ProveedoresComponent
  },
  {
    path: 'http://localhost:4200/clientes',
    redirectTo: '/clientes',
    pathMatch: 'full'
  },
  {
    path:'clientes',
    component: ClientesComponent
  },

  
  //ruta para producto-terminado
  {
    path: 'http://localhost:4200/producto-terminado',
    redirectTo: '/producto-terminado',
    pathMatch: 'full'
  },
  {
    path:'producto-terminado',
    component: ProductoTerminadoComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

 