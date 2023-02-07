import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent} from './components/inicio/inicio.component'
import { MateriaPrimaComponent } from './components/materia-prima/materia-prima.component';
//definicion de rutas 
const routes: Routes = [
   
  {
    path: '',
    redirectTo: '/Inicio',
    pathMatch: 'full'
  },
  {
    path:'Inicio',
    component: InicioComponent
  },
  {
    path: 'http://localhost:4200/materia-prima',
    redirectTo: '/materia-prima',
    pathMatch: 'full'
  },
  {
    path:'materia-prima',
    component: MateriaPrimaComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// const routes: Routes = [
//   {
//     path: '',
//     redirectTo: '/Inicio',
//     pathMatch: 'full'
//   },
//   {
//     path:'Inicio',
//     component: InicioComponent
//   }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }