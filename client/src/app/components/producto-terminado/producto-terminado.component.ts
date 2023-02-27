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
  API_URI = 'http://localhost:3000/api';

  produc: Producto_terminado= {
    id: 0,
    codigo: '',
    costo_terminado:'',
    cantidad_terminado: '',
    receta: '',
    imagen: ''
  }

  producArr: any = [];
  codigo!: number;
  edit : boolean = true;
  fechaActual: Date;
  constructor(private ProductoTerminadoService: ProductoTerminadoService, private router: Router , private activatedRoute : ActivatedRoute, private recetasService: RecetasService) {
    this.fechaActual = new Date();}
  
  ngOnInit() {
    this.codigo = Math.floor(10000 + Math.random() * 90000);
    this.getMP();
  }
  
  imprimir(): void {
    window.print();
  }

  saveNewMP() {
     
    delete this.produc.id;

    this.ProductoTerminadoService.saveProducto_terminado(this.produc).subscribe({
      next: (v: any) => [this.produc = v,this.edit = false ],
      error: (e: any) => console.error(e),
      complete: () => ( this.getMP())
    })
  }

  getMP() {
    this.ProductoTerminadoService.getProducto_terminadolist().subscribe({
      next: (v: any) => this.producArr = v,
      error: (e: any) => console.error(e),
      complete: () => console.info('complete')
      
    })
  }

  deleteMP(id: any) {
    this.ProductoTerminadoService.deleteProducto_terminado(id).subscribe({
      next: (v: any) => [console.log(v),console.log(`se esta eliminando el elemento ${id}`)],
      error: (e: any) => console.error(e),
      complete: () => this.getMP(),

    })

  }
  get_MP(id : string) {
    this.ProductoTerminadoService.getProducto_terminado(id).subscribe({
      next: (v: any) => [[this.produc] = v, this.edit = true, console.log(id)],
      error: (e: any) => console.error(e),
      complete: () => console.log('get producto terminado complete'+id)
    })


  }

  updateMP(id: any){
    this.ProductoTerminadoService.updateProducto_terminado(id,this.produc).subscribe({
      next: (v: any) => [this.produc, console.log(v), console.log([this.produc], this.produc), console.log(id)],
      error: (e: any) => console.error(e),
      complete: () => [this.getMP()]      
    })
     
     
  }

  reset(){
    this.produc.id= 0;
    this.produc.codigo = '';
    this.produc.costo_terminado='';
    this.produc.cantidad_terminado='';
    this.produc.receta='';
    this.produc.imagen = ''; 
  }

// validar codigo 
validarCodigo(codigo: string): boolean {
  // el codigo debe tener 2 letras  mayusculas y 3 numeros
  return /^([A-Z]{2})([0-9]{3})$/.test(codigo);
}

validarCodigoAlerta(codigo: string): boolean {
  // activaciond e los mensajes de error o aceptacion
  if (!this.validarCodigo(codigo)) {
    const element = document.querySelector('.errC') as HTMLElement;
    element.style.display = "block";
    const element2 = document.querySelector('.valC') as HTMLElement;
    element2.style.display = "none";

    return false;
  } else {
    const element = document.querySelector('.errC') as HTMLElement;
    element.style.display = "none";
    const element2 = document.querySelector('.valC') as HTMLElement;
    element2.style.display = "block";

    return true;
  }
}


  validarPrecio(costo_terminado: string): boolean {
    // el codigo debe tener 2 letras  mayusculas y 3 numeros
    return /^([0-9]{1,4}\.[0-9]{1,2})$/.test(costo_terminado);
  }

  validarPrecioAlerta(costo_terminado: string): boolean {
    // activaciond e los mensajes de error o aceptacion
    if (!this.validarPrecio(costo_terminado)) {
      const element = document.querySelector('.errP') as HTMLElement;
      element.style.display = "block";
      const element2 = document.querySelector('.valP') as HTMLElement;
      element2.style.display = "none";

      return false;
    } else {
      const element = document.querySelector('.errP') as HTMLElement;
      element.style.display = "none";
      const element2 = document.querySelector('.valP') as HTMLElement;
      element2.style.display = "block";

      return true;
    }
  }

  validarImagen(imagen: string): boolean {
    // el codigo debe tener 2 letras  mayusculas y 3 numeros
    return /^(https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*)$/.test(imagen);
  }

  validarImagenAlerta(imagen: string): boolean {
    // activaciond e los mensajes de error o aceptacion
    if (!this.validarImagen(imagen)) {
      const element = document.querySelector('.errI') as HTMLElement;
      element.style.display = "block";
      const element2 = document.querySelector('.valI') as HTMLElement;
      element2.style.display = "none";

      return false;
    } else {
      const element = document.querySelector('.errI') as HTMLElement;
      element.style.display = "none";
      const element2 = document.querySelector('.valI') as HTMLElement;
      element2.style.display = "block";

      return true;
    }
  }

  validarCantidad(cantidad_terminado: string): boolean {
    // el codigo debe tener 2 letras  mayusculas y 3 numeros
    return /^([0-9]{1,4})$/.test(cantidad_terminado);
  }

  validarCantidadAlerta(cantidad_terminado: string): boolean {
    // activaciond e los mensajes de error o aceptacion
    if (!this.validarCantidad(cantidad_terminado)) {
      const element = document.querySelector('.errCa') as HTMLElement;
      element.style.display = "block";
      const element2 = document.querySelector('.valCa') as HTMLElement;
      element2.style.display = "none";

      return false;
    } else {
      const element = document.querySelector('.errCa') as HTMLElement;
      element.style.display = "none";
      const element2 = document.querySelector('.valCa') as HTMLElement;
      element2.style.display = "block";

      return true;
    }
  }

 /// validacion EDIT    -------------------------------------------------
 validarCodigoEd(codigo: string): boolean {
  // el codigo debe tener 2 letras  mayusculas y 3 numeros
  return /^([A-Z]{2})([0-9]{3})$/.test(codigo);
}

validarCodigoAlertaEd(codigo: string): boolean {
  // activaciond e los mensajes de error o aceptacion
  if (!this.validarCodigoEd(codigo)) {
    const element = document.querySelector('.errCEd') as HTMLElement;
    element.style.display = "block";
    const element2 = document.querySelector('.valCEd') as HTMLElement;
    element2.style.display = "none";

    return false;
  } else {
    const element = document.querySelector('.errCEd') as HTMLElement;
    element.style.display = "none";
    const element2 = document.querySelector('.valCEd') as HTMLElement;
    element2.style.display = "block";

    return true;
  }
}
 validarPrecioEd(costo_terminado: string): boolean {
  // el codigo debe tener 2 letras  mayusculas y 3 numeros
  return /^([0-9]{1,4}\.[0-9]{1,2})$/.test(costo_terminado);
}

validarPrecioAlertaEd(costo_terminado: string): boolean {
  // activaciond e los mensajes de error o aceptacion
  if (!this.validarPrecioEd(costo_terminado)) {
    const element = document.querySelector('.errPEd') as HTMLElement;
    element.style.display = "block";
    const element2 = document.querySelector('.valPEd') as HTMLElement;
    element2.style.display = "none";

    return false;
  } else {
    const element = document.querySelector('.errPEd') as HTMLElement;
    element.style.display = "none";
    const element2 = document.querySelector('.valPEd') as HTMLElement;
    element2.style.display = "block";

    return true;
  }
}

validarImagenEd(imagen: string): boolean {
  // el codigo debe tener 2 letras  mayusculas y 3 numeros
  return /^(https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*)$/.test(imagen);
}

validarImagenAlertaEd(imagen: string): boolean {
  // activaciond e los mensajes de error o aceptacion
  if (!this.validarImagenEd(imagen)) {
    const element = document.querySelector('.errIEd') as HTMLElement;
    element.style.display = "block";
    const element2 = document.querySelector('.valIEd') as HTMLElement;
    element2.style.display = "none";

    return false;
  } else {
    const element = document.querySelector('.errIEd') as HTMLElement;
    element.style.display = "none";
    const element2 = document.querySelector('.valIEd') as HTMLElement;
    element2.style.display = "block";

    return true;
  }
}

validarCantidadEd(cantidad_terminado: string): boolean {
  // el codigo debe tener 2 letras  mayusculas y 3 numeros
  return /^([0-9]{1,4})$/.test(cantidad_terminado);
}

validarCantidadAlertaEd(cantidad_terminado: string): boolean {
  // activaciond e los mensajes de error o aceptacion
  if (!this.validarCantidad(cantidad_terminado)) {
    const element = document.querySelector('.errCaEd') as HTMLElement;
    element.style.display = "block";
    const element2 = document.querySelector('.valCaEd') as HTMLElement;
    element2.style.display = "none";

    return false;
  } else {
    const element = document.querySelector('.errCaEd') as HTMLElement;
    element.style.display = "none";
    const element2 = document.querySelector('.valCaEd') as HTMLElement;
    element2.style.display = "block";

    return true;
  }
}

}
