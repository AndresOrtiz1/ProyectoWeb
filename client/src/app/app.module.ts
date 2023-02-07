import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CardsComponent } from './components/cards/cards.component';
import { FooterComponent } from './components/footer/footer.component';
import { MateriaPrimaComponent } from './components/materia-prima/materia-prima.component';
import { InicioComponent } from './components/inicio/inicio.component';

import {MateriaPrimaServicesService} from './services/materia-prima.services.service'

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    CardsComponent,
    FooterComponent,
    MateriaPrimaComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  //exportar los metodos para poder pedir datos
  providers: [
    MateriaPrimaServicesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
