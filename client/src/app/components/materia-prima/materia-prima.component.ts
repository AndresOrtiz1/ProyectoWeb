import { Component, HostBinding, IterableDiffers, OnInit } from '@angular/core';
import { MateriaPrima } from 'src/app/models/materia_prima.models';
import { ActivatedRoute, Router } from '@angular/router'


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
  edit : boolean = true;
  constructor(private materiaPrimaServicesService: MateriaPrimaServicesService, private route: Router , private activatedRoute : ActivatedRoute) {

  }
  
  ngOnInit() {
    this.getMP();
    

  }

  saveNewMP() {
    
    delete this.mateiraP.id;
    this.materiaPrimaServicesService.saveMateria_prima(this.mateiraP).subscribe({
      next: (v: any) => [this.mateiraP = v,this.edit = false ],
      error: (e: any) => console.error(e),
      complete: () => (this.route.navigate(['/materia-prima']), this.getMP())
    })
  }

  getMP() {
    this.materiaPrimaServicesService.getMateria_prima_list().subscribe({
      next: (v: any) => this.materias_primasArr = v,
      error: (e: any) => console.error(e),
      complete: () => console.info('complete')
      
    })
  }

  deleteMP(id: string) {
    this.materiaPrimaServicesService.deleteMateria_pirma(id).subscribe({
      next: (v: any) => [console.log(v),console.log(`se esta eliminando el juego ${id}`)],
      error: (e: any) => console.error(e),
      complete: () => this.getMP(),

    })

  }
  get_MP(id : string) {
    this.materiaPrimaServicesService.getMateria_pirma(id).subscribe({
      next: (v: any) => [[this.mateiraP] = v, this.edit = true, console.log(id)],
      error: (e: any) => console.error(e),
      complete: () => console.log('get materia prima complete'+id)
    })


  }

  updateMP(id: any){
     console.log([this.mateiraP]);
     console.log((id));
    //  this.materiaPrimaServicesService.updateMateria_prima(id,this.materiaPrimaServicesService)
     
     
  }
}
