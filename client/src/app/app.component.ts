import { Component } from '@angular/core';
import { AutenticacionService } from './services/autenticacion.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  constructor(private loginPrd:AutenticacionService){
    
  }
  public verPagina():boolean{
    return this.loginPrd.habilitarPagina();

  }

}
