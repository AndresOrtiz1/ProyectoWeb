import { Component, HostBinding, IterableDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Producto_terminado } from 'src/app/models/producto_terminado';
import { ProductoTerminadoService } from '../../services/producto-terminado.service'
import { Recetas, Ingrediente } from 'src/app/models/recetas.models'
import { RecetasService } from '../../services/recetas.service'



@Component({
  selector: 'app-producto-terminado',
  templateUrl: './producto-terminado.component.html',
  styleUrls: ['./producto-terminado.component.css']
})
export class ProductoTerminadoComponent implements OnInit {

  @HostBinding('class') classes = 'modal-body';
  ingredienteP: Ingrediente = {
    producto: '',
    cantidad: 0,
  }

  recetaP: Recetas = {
    id: 0,
    nombrereceta: '',
    // ingredientes: [this.ingredienteP],

  }
  recetasArr: Recetas[] = [];
  getREC() {
    this.recetasService.getRecetaslist().subscribe({
      next: (v: any) => { this.recetasArr = v; console.log(this.recetasArr) },
      error: (e: any) => console.error(e),
      complete: () => console.info('receta obtenida')
    })
  }
  get_REC(id: string) {
    this.recetasService.getRecetas(id).subscribe({
      next: (v: any) => [[this.recetaP] = v, console.log(id)],
      error: (e: any) => console.error(e),
      complete: () => console.log('get materia prima complete' + id)
    })
  }

  produc: Producto_terminado = {
    id_terminado: 0,
    costo_terminado: '',
    cantidad_terminado: '',
    receta: '',
    imagen: '',
  }

  producArr: any = [];
  constructor(
    private ProductoTerminadoService: ProductoTerminadoService,
    private recetasService: RecetasService,
  ) {
  }

  ngOnInit() {
    this.getPT();
  }

  saveNewPT() {
    delete this.produc.id_terminado;
    this.ProductoTerminadoService.saveProducto_terminado(this.produc).subscribe({
      next: (v: any) => this.produc = v,
      error: (e: any) => console.error(e),
      complete: () => (this.getPT())
    })
  }

  getPT() {
    this.ProductoTerminadoService.getProducto_terminadolist().subscribe({
      next: (v: any) => this.producArr = v,
      error: (e: any) => console.error(e),
      complete: () => console.info('complete')

    })
  }

  deletePT(id_terminado: any) {
    this.ProductoTerminadoService.deleteProducto_terminado(id_terminado).subscribe({
      next: (v: any) => [console.log(v), console.log(`se esta eliminando el elemento ${id_terminado}`)],
      error: (e: any) => console.error(e),
      complete: () => this.getPT(),

    })

  }
  get_PT(id_terminado: string) {
    this.ProductoTerminadoService.getProducto_terminado(id_terminado).subscribe({
      next: (v: any) => [[this.produc] = v, console.log(id_terminado)],
      error: (e: any) => console.error(e),
      complete: () => console.log('get producto terminado complete' + id_terminado)
    })


  }

  updatePT(id_terminado: any) {
    this.ProductoTerminadoService.updateProducto_terminado(id_terminado, this.produc).subscribe({
      next: (v: any) => [this.produc, console.log(v), console.log([this.produc], this.produc), console.log(id_terminado)],
      error: (e: any) => console.error(e),
      complete: () => [this.getPT()]
    })


  }

  reset() {
    this.produc.id_terminado = 0;
    this.produc.costo_terminado = '';
    this.produc.cantidad_terminado = '';
    this.produc.receta = '';
    this.produc.imagen = '';
  }

}
