import { Component, HostBinding, OnInit } from '@angular/core';
import { MateriaPrima } from 'src/app/models/materia_prima.models'; 

import { MateriaPrimaServicesService } from '../../services/materia-prima.services.service'
 

@Component({
  selector: 'app-materia-prima',
  templateUrl: './materia-prima.component.html',
  styleUrls: ['./materia-prima.component.css'],
  template: `
    <button (click)="imprimir()">Imprimir</button>
  `
})
export class MateriaPrimaComponent implements OnInit {

  @HostBinding('class') classes = 'modal-body';
 
  mateiraP: MateriaPrima = {
    id: 0,
    codigo: '',
    nombre: '',
    precio: '',
    unidad_medida: '',
    cantidad: '',
    fecha_ingreso: '',
    fecha_caducidad: '',
    imagen: ''
  }

  materias_primasArr: any = [];
  codigo!: number;
  fechaActual: Date;
 
  constructor(
    private materiaPrimaServicesService: MateriaPrimaServicesService,

  ) {
    this.fechaActual = new Date();
  }
  ngOnInit() {
    this.codigo = Math.floor(10000 + Math.random() * 90000);
    this.getMP();
    
  }

  imprimir(): void {

    window.print();
  }

 

  // metodos del componetne CRUD
  saveNewMP() {
    delete this.mateiraP.id;
    this.materiaPrimaServicesService.saveMateria_prima(this.mateiraP).subscribe({
      next: (v: any) => [this.mateiraP = v, this.getMP()],
      error: (e: any) => console.error(e),
      complete: () => (this.getMP())
    })
  }

  getMP() {
    this.materiaPrimaServicesService.getMateria_prima_list().subscribe({
      next: (v: any) => this.materias_primasArr = v,
      error: (e: any) => console.error(e),
      complete: () => console.info('complete')
    })
  }

  deleteMP(id: any) {
    this.materiaPrimaServicesService.deleteMateria_pirma(id).subscribe({
      next: (v: any) => [console.log(v), console.log(`se esta eliminando el elemento ${id}`)],
      error: (e: any) => console.error(e),
      complete: () => this.getMP(),

    })

  }
  get_MP(id: string) {
    this.materiaPrimaServicesService.getMateria_pirma(id).subscribe({
      next: (v: any) => [[this.mateiraP] = v, console.log(id)],
      error: (e: any) => console.error(e),
      complete: () => console.log('get materia prima complete' + id)
    })
  }

  updateMP(id: any) {
    this.materiaPrimaServicesService.updateMateria_prima(id, this.mateiraP).subscribe({
      next: (v: any) => [this.mateiraP, console.log(v), console.log([this.mateiraP], this.mateiraP), console.log(id)],
      error: (e: any) => console.error(e),
      complete: () => [this.getMP()]
    })
  }

  reset() {
    this.mateiraP.id = 0;
    this.mateiraP.codigo = '';
    this.mateiraP.nombre = '';
    this.mateiraP.precio = '';
    this.mateiraP.unidad_medida = '';
    this.mateiraP.cantidad = '';
    this.mateiraP.fecha_ingreso = '';
    this.mateiraP.fecha_caducidad = '';
    this.mateiraP.imagen = '';
  }
  //validaciones

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

  // validar Nombre 
  validarNombre(nombre: string): boolean {
    // el codigo debe tener 2 letras  mayusculas y 3 numeros
    return /^([A-Za-z ]{2,25})$/.test(nombre);
  }

  validarNombreAlerta(nombre: string): boolean {
    // activaciond e los mensajes de error o aceptacion
    if (!this.validarNombre(nombre)) {
      const element = document.querySelector('.errN') as HTMLElement;
      element.style.display = "block";
      const element2 = document.querySelector('.valN') as HTMLElement;
      element2.style.display = "none";

      return false;
    } else {
      const element = document.querySelector('.errN') as HTMLElement;
      element.style.display = "none";
      const element2 = document.querySelector('.valN') as HTMLElement;
      element2.style.display = "block";

      return true;
    }
  }

  validarPrecio(precio: string): boolean {
    // el codigo debe tener 2 letras  mayusculas y 3 numeros
    return /^([0-9]{1,4}\.[0-9]{1,2})$/.test(precio);
  }

  validarPrecioAlerta(precio: string): boolean {
    // activaciond e los mensajes de error o aceptacion
    if (!this.validarPrecio(precio)) {
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

  validarCantidad(cantidad: string): boolean {
    // el codigo debe tener 2 letras  mayusculas y 3 numeros
    return /^([0-9]{1,4})$/.test(cantidad);
  }

  validarCantidadAlerta(cantidad: string): boolean {
    // activaciond e los mensajes de error o aceptacion
    if (!this.validarCantidad(cantidad)) {
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


  // validar Nombre 
  validarNombreEd(nombre: string): boolean {
    // el codigo debe tener 2 letras  mayusculas y 3 numeros
    return /^([A-Za-z ]{2,25})$/.test(nombre);
  }

  validarNombreAlertaEd(nombre: string): boolean {
    // activaciond e los mensajes de error o aceptacion
    if (!this.validarNombreEd(nombre)) {
      const element = document.querySelector('.errNEd') as HTMLElement;
      element.style.display = "block";
      const element2 = document.querySelector('.valNEd') as HTMLElement;
      element2.style.display = "none";

      return false;
    } else {
      const element = document.querySelector('.errNEd') as HTMLElement;
      element.style.display = "none";
      const element2 = document.querySelector('.valNEd') as HTMLElement;
      element2.style.display = "block";

      return true;
    }
  }

  validarPrecioEd(precio: string): boolean {
    // el codigo debe tener 2 letras  mayusculas y 3 numeros
    return /^([0-9]{1,4}\.[0-9]{1,2})$/.test(precio);
  }

  validarPrecioAlertaEd(precio: string): boolean {
    // activaciond e los mensajes de error o aceptacion
    if (!this.validarPrecio(precio)) {
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

  validarCantidadEd(cantidad: string): boolean {
    // el codigo debe tener 2 letras  mayusculas y 3 numeros
    return /^([0-9]{1,4})$/.test(cantidad);
  }

  validarCantidadAlertaEd(cantidad: string): boolean {
    // activaciond e los mensajes de error o aceptacion
    if (!this.validarCantidad(cantidad)) {
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

  validarImagenEd(imagen: string): boolean {
    // el codigo debe tener 2 letras  mayusculas y 3 numeros
    return /^(https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*)$/.test(imagen);
  }

  validarImagenAlertaEd(imagen: string): boolean {
    // activaciond e los mensajes de error o aceptacion
    if (!this.validarImagen(imagen)) {
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

  /// inpresion de reportes 
   
}
