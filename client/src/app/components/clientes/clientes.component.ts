import { Component, HostBinding, OnInit } from '@angular/core';
import { Clientes } from 'src/app/models/clientes.models';
import { ActivatedRoute, Router } from '@angular/router';
import {FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms';


import { ClientesService } from '../../services/clientes.service'


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  @HostBinding('class') classes = 'modal-body';
  API_URI = 'http://localhost:3000/api';

  cliente: Clientes = {
    id: 0,
    cedulaCliente: '',
    nombresCliente: '',
    apellidosCliente: '',
    correoCliente: '',
    edadCliente: '',
    direccionCliente: '',
    telefonoCliente: ''
  }

  clientesArr: any = []; 
  valfomr !: FormGroup;

  constructor(
    private ClientesServicesService: ClientesService,
    private formBuldier : FormBuilder,
  ){
    this.validFomr();
  }
  ngOnInit() {
    this.getMP(); 
  }

  validFomr(){
    this.valfomr = this.formBuldier.group({
      cedulaCliente:[this.cliente.cedulaCliente, [Validators.required , Validators.pattern('^([A-Z]{2})([0-9]{3})$')]],
      nombresCliente:[this.cliente.nombresCliente,[Validators.required, Validators.pattern('^([A-Za-z ]{2,25})$')]],
      apellidosCliente:[this.cliente.apellidosCliente,[Validators.required, Validators.pattern('^([0-9]{1,4}\.[0-9]{1,2})$')]],
      correoCliente:[this.cliente.correoCliente ,[Validators.required ]],
      edadCliente:[this.cliente.edadCliente,[Validators.required, Validators.pattern(' ^([0-9]{1,4})$')]],
      direccionCliente:[this.cliente.direccionCliente,[Validators.required ]],
      telefonoCliente:[this.cliente.telefonoCliente,[Validators.required ]],
      
    })

  }
  
  get codigo() {return this.valfomr.get('codigo');}

  
  // metodos del componetne CRUD
  saveNewMP() {
    delete this.cliente.id;
    this.ClientesServicesService.saveClientes(this.cliente).subscribe({
      next: (v: any) => [this.cliente = v, this.getMP()],
      error: (e: any) => console.error(e),
      complete: () => ( this.getMP())
    })
  }

  getMP() {
    this.ClientesServicesService.getClienteslist().subscribe({
      next: (v: any) => this.clientesArr = v,
      error: (e: any) => console.error(e),
      complete: () => console.info('complete')
    })
  }

  deleteMP(id: any) {
    this.ClientesServicesService.deleteClientes(id).subscribe({
      next: (v: any) => [console.log(v),console.log(`se esta eliminando el elemento ${id}`)],
      error: (e: any) => console.error(e),
      complete: () => this.getMP(),

    })

  }
  get_MP(id : string) {
    this.ClientesServicesService.getClientes(id).subscribe({
      next: (v: any) => [[this.cliente] = v, console.log(id)],
      error: (e: any) => console.error(e),
      complete: () => console.log('get materia prima complete'+id)
    })
  }

  updateMP(id: any){
    this.ClientesServicesService.updateClientes(id,this.cliente).subscribe({
      next: (v: any) => [this.cliente, console.log(v), console.log([this.cliente], this.cliente), console.log(id)],
      error: (e: any) => console.error(e),
      complete: () => [this.getMP()]      
    })
  }

  reset(){
    this.cliente.id=0;
    this.cliente.cedulaCliente = '';
    this.cliente.nombresCliente = '';
    this.cliente.apellidosCliente = '';
    this.cliente.correoCliente = '';
    this.cliente.edadCliente = '';
    this.cliente.direccionCliente = '';
    this.cliente.telefonoCliente = '';
    
  }
  //validaciones



}