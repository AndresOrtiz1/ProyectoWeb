import { Component, HostBinding, IterableDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Producto_terminado, Ingrediente} from 'src/app/models/producto_terminado.models';
import { ProductoTerminadoService } from '../../services/producto-terminado.service'
import { NgForm } from '@angular/forms';
import { MateriaPrima } from 'src/app/models/materia_prima.models';


import { MateriaPrimaServicesService } from '../../services/materia-prima.services.service'
 
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

  //contructor
  constructor(
    private ProductoTerminadoService: ProductoTerminadoService, private materiaPrimaServicesService: MateriaPrimaServicesService) {
    this.fechaActual = new Date();}
  
  ngOnInit() {
    this.codigo = Math.floor(10000 + Math.random() * 90000);
    this.getMP();
    this.getRe();
  }

  //variables
  codigo!: number;
  fechaActual: Date;


  //inicialisacion de modelos 

  //materia prima
  mateiraP: MateriaPrima = {
    id: 0,
    codigo: ' ',
    nombre: ' ',
    precio: ' ',
    unidad_medida: ' ',
    cantidad: ' ',
    fecha_ingreso: ' ',
    fecha_caducidad: ' ',
    imagen: ' '
  }

  //recetas 
  recetaP: Producto_terminado = {
    id: 0,
    nombre: ' ',
    imagen: ' '
  }

  //ingredientes
  ingredienteP: Ingrediente = {
    id: 0,
    receta_id: 0,
    materia_prima: ' ',
    cantidad: ' ',
    unidad_medida: ' '
  }

  //arreglos
  materias_primasArr: any = [];
  recetasArr: any = [];
  ingredientesArr: any = [];
  edit : boolean = true;
  //metodos materia prima

  getMP() {
    this.materiaPrimaServicesService.getMateria_prima_list().subscribe({
      next: (v: any) => this.materias_primasArr = v,
      error: (e: any) => console.error(e),
      complete: () => console.info('complete')
    })
  }

  mateiraP2: MateriaPrima = { nombre: '', cantidad: '', unidad_medida: '' };
  materiasPrimasAgregadas: MateriaPrima[] = [];

  agregarIngrediente() {
    this.materiasPrimasAgregadas.push({
      nombre: this.mateiraP2.nombre,
      cantidad: this.mateiraP2.cantidad,
      unidad_medida: this.mateiraP2.unidad_medida
    });
    this.mateiraP2 = { nombre: '', cantidad: '', unidad_medida: '' };
    console.log(this.materiasPrimasAgregadas)
  }
  eliminarIngrediente(materiaPrima: MateriaPrima) {
    const index = this.materiasPrimasAgregadas.indexOf(materiaPrima);
    if (index !== -1) {
      this.materiasPrimasAgregadas.splice(index, 1);
    }
  }
  
   //metodos recetas
   getRe() {
    this.ProductoTerminadoService.getProducto_terminadolist().subscribe({
      next: (v: any) => this.recetasArr = v,
      error: (e: any) => console.error(e),
      complete: () => console.info('complete')
    })
  }

  saveNewRe() {
    delete this.recetaP.id;
    this.ProductoTerminadoService.saveProducto_terminado(this.recetaP).subscribe({
      next: (v: any) => this.recetasArr = v,
      error: (e: any) => console.error(e),
      complete: () => (this.getMP())
    })
  }
 saveNewReceta(){
  delete this.recetaP.id;
  this.ProductoTerminadoService.saveProducto_terminado(this.recetaP).subscribe({
    next: (v: any) => [this.recetaP = v,this.edit = false ],
    error: (e: any) => console.error(e),
    complete: () => (this.getRe())
  })
 }
  
  
  
  imprimir(): void {
    window.print();
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
