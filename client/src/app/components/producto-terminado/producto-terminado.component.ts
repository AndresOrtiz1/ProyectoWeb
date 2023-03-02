import { Component, HostBinding, OnInit } from '@angular/core';
 

@Component({
  selector: 'app-producto-terminado',
  templateUrl: './producto-terminado.component.html',
  styleUrls: ['./producto-terminado.component.css'],
  template: `
  <button (click)="imprimir()">Imprimir</button>
`
})
export class ProductoTerminadoComponent implements OnInit {

  @HostBinding('class') classes = 'modal-body';
  
   
  
  ngOnInit() {
     
  }
   
}