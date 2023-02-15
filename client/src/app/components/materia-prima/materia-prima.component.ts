import { Component, HostBinding, OnInit } from '@angular/core';
import { MateriaPrima } from 'src/app/models/materia_prima.models';
import { ActivatedRoute, Router } from '@angular/router';
import {FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms';


import { MateriaPrimaServicesService } from '../../services/materia-prima.services.service'


@Component({
  selector: 'app-materia-prima',
  templateUrl: './materia-prima.component.html',
  styleUrls: ['./materia-prima.component.css']
})
export class MateriaPrimaComponent implements OnInit {

  @HostBinding('class') classes = 'modal-body';
  API_URI = 'http://localhost:3000/api';

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
  valfomr !: FormGroup;

  constructor(
    private materiaPrimaServicesService: MateriaPrimaServicesService,
    private formBuldier : FormBuilder,
  ){
    this.validFomr();
  }
  ngOnInit() {
    this.getMP(); 
  }

  validFomr(){
    this.valfomr = this.formBuldier.group({
      codigo:[this.mateiraP.codigo, [Validators.required , Validators.pattern('^([A-Z]{2})([0-9]{3})$')]],
      nombre:[this.mateiraP.nombre,[Validators.required, Validators.pattern('^([A-Za-z ]{2,25})$')]],
      precio:[this.mateiraP.precio,[Validators.required, Validators.pattern('^([0-9]{1,4}\.[0-9]{1,2})$')]],
      unidad_medida:[this.mateiraP.unidad_medida ,[Validators.required ]],
      cantidad:[this.mateiraP.cantidad,[Validators.required, Validators.pattern(' ^([0-9]{1,4})$')]],
      fecha_ingreso:[this.mateiraP.fecha_ingreso,[Validators.required ]],
      fecha_caducidad:[this.mateiraP.fecha_caducidad,[Validators.required ]],
      imagen:[this.mateiraP.imagen,[Validators.required, Validators.pattern('^(https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*)$')]],
    })

  }
  
  get codigo() {return this.valfomr.get('codigo');}

  
  // metodos del componetne CRUD
  saveNewMP() {
    delete this.mateiraP.id;
    this.materiaPrimaServicesService.saveMateria_prima(this.mateiraP).subscribe({
      next: (v: any) => [this.mateiraP = v, this.getMP()],
      error: (e: any) => console.error(e),
      complete: () => ( this.getMP())
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
      next: (v: any) => [console.log(v),console.log(`se esta eliminando el elemento ${id}`)],
      error: (e: any) => console.error(e),
      complete: () => this.getMP(),

    })

  }
  get_MP(id : string) {
    this.materiaPrimaServicesService.getMateria_pirma(id).subscribe({
      next: (v: any) => [[this.mateiraP] = v, console.log(id)],
      error: (e: any) => console.error(e),
      complete: () => console.log('get materia prima complete'+id)
    })
  }

  updateMP(id: any){
    this.materiaPrimaServicesService.updateMateria_prima(id,this.mateiraP).subscribe({
      next: (v: any) => [this.mateiraP, console.log(v), console.log([this.mateiraP], this.mateiraP), console.log(id)],
      error: (e: any) => console.error(e),
      complete: () => [this.getMP()]      
    })
  }

  reset(){
    this.mateiraP.id=0;
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



}
