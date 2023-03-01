import { Component, HostBinding, IterableDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Producto_terminado} from 'src/app/models/producto_terminado';
import { ProductoTerminadoService } from '../../services/producto-terminado.service'
import { Recetas, Ingrediente } from 'src/app/models/recetas.models'
import { RecetasService } from '../../services/recetas.service'


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
  ingredienteP: Ingrediente = {
    producto: '',
    cantidad: 0,
  }

   
  
  ngOnInit() {
     
  }
   
}
