import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { MateriaPrimaComponent } from './components/materia-prima/materia-prima.component';
import { LoginComponent } from './components/login/login.component'

import { MateriaPrimaServicesService } from './services/materia-prima.services.service';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ProductoTerminadoComponent } from './components/producto-terminado/producto-terminado.component';



@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    MateriaPrimaComponent,
    LoginComponent,
    ProveedoresComponent,
    ClientesComponent,
    ProductoTerminadoComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ],
  //exportar los metodos para poder pedir datos
  providers: [
    MateriaPrimaServicesService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
