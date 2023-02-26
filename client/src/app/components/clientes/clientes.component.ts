import { Component, HostBinding, IterableDiffers, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Clientes } from 'src/app/models/clientes.models';
import { ClientesService } from '../../services/clientes.service'


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  @HostBinding('class') classes = 'modal-body';
  API_URI = 'http://localhost:3000/api';

  client: Clientes = {
    id: 0,
    nombresCliente: '',
    apellidosCliente: '',
    cedulaCliente: '',
    correoCliente: '',
    edadCliente: '',
    direccionCliente: '',
    telefonoCliente: ''
  }

  clientesArr: any = []; 
  edit : boolean = true;
  constructor(
    private ClientesServicesService: ClientesService,
    private router: Router , private activatedRoute : ActivatedRoute) {
    }
    
  ngOnInit() {
    this.getMP(); 
  }



  
  // metodos del componetne CRUD
  saveNewMP() {
    delete this.client.id;
    this.ClientesServicesService.saveClientes(this.client).subscribe({
      next: (v: any) => [this.client = v,this.edit = false ],
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
      next: (v: any) => [[this.client] = v, this.edit = true, console.log(id)],
      error: (e: any) => console.error(e),
      complete: () => console.log('get materia prima complete'+id)
    })
  }

  updateMP(id: any){
    this.ClientesServicesService.updateClientes(id,this.client).subscribe({
      next: (v: any) => [this.client, console.log(v), console.log([this.client], this.client), console.log(id)],
      error: (e: any) => console.error(e),
      complete: () => [this.getMP()]      
    })
  }

  reset(){
    this.client.id= 0;
    this.client.nombresCliente = '';
    this.client.apellidosCliente = '';
    this.client.cedulaCliente = '';
    this.client.correoCliente = '';
    this.client.edadCliente = '';
    this.client.direccionCliente = '';
    this.client.telefonoCliente = '';
    
  }
  //validaciones



}