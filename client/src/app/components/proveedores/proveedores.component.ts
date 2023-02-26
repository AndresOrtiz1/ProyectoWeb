import { Component, HostBinding, IterableDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Proveedores } from 'src/app/models/proveedores.models';
import { ProveedoresService } from '../../services/proveedores.service'
@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css'],
  template: `
    <button (click)="imprimir()">Imprimir</button>
  `
})
export class ProveedoresComponent implements OnInit{
  
  @HostBinding('class') classes = 'modal-body';
  API_URI = 'http://localhost:3000/api';

  provee: Proveedores= {
    id: 0,
    codigo: '',
    NombreApellido:'',
    Cedula: '',
    NumeroCelular: '',
    CorreoElectronico: '',
    Direccion: '',
    NombreEmpresa: '',
    TelefonoEmpresa: '',
    DireccionEmpresa: '',
    CorreoEmpresa: ''
  }

  proveedoresArr: any = [];
  codigo!: number;
  fechaActual: Date;
  edit : boolean = true;
  constructor(
    private ProveedoresService: ProveedoresService, private router: Router , private activatedRoute : ActivatedRoute) 
    {
    this.fechaActual = new Date();
  }
  
  ngOnInit() {
    this.codigo = Math.floor(10000 + Math.random() * 90000);
    this.getMP();
  }

  imprimir(): void {
    window.print();
  }

  saveNewMP() {
     
    delete this.provee.id;

    this.ProveedoresService.saveProveedores(this.provee).subscribe({
      next: (v: any) => [this.provee = v,this.edit = false ],
      error: (e: any) => console.error(e),
      complete: () => ( this.getMP())
    })
  }

  getMP() {
    this.ProveedoresService.getProveedoreslist().subscribe({
      next: (v: any) => this.proveedoresArr = v,
      error: (e: any) => console.error(e),
      complete: () => console.info('complete')
      
    })
  }

  deleteMP(id: any) {
    this.ProveedoresService.deleteProveedores(id).subscribe({
      next: (v: any) => [console.log(v),console.log(`se esta eliminando el elemento ${id}`)],
      error: (e: any) => console.error(e),
      complete: () => this.getMP(),

    })

  }
  get_MP(id : string) {
    this.ProveedoresService.getProveedores(id).subscribe({
      next: (v: any) => [[this.provee] = v, this.edit = true, console.log(id)],
      error: (e: any) => console.error(e),
      complete: () => console.log('get proveedores complete'+id)
    })


  }

  updateMP(id: any){
    this.ProveedoresService.updateProveedores(id,this.provee).subscribe({
      next: (v: any) => [this.provee, console.log(v), console.log([this.provee], this.provee), console.log(id)],
      error: (e: any) => console.error(e),
      complete: () => [this.getMP()]      
    })
     
     
  }

  reset(){
    this.provee.id= 0;
    this.provee.codigo = '';
    this.provee.NombreApellido='';
    this.provee.Cedula='';
    this.provee.NumeroCelular='';
    this.provee.CorreoElectronico='';
    this.provee.Direccion='';
    this.provee.NombreEmpresa='';
    this.provee.TelefonoEmpresa='';
    this.provee.DireccionEmpresa='';
    this.provee.CorreoEmpresa='';
  }
 
}

