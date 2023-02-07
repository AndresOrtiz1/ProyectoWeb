import { Component, OnInit } from '@angular/core';
import { MateriaPrima } from 'src/app/models/materia_prima.models';

import { MateriaPrimaServicesService } from '../../services/materia-prima.services.service'

@Component({
  selector: 'app-materia-prima',
  templateUrl: './materia-prima.component.html',
  styleUrls: ['./materia-prima.component.css']
})
export class MateriaPrimaComponent implements OnInit{
  
  materias_primasArr: any = [];
  constructor(private materiaPrimaServicesService: MateriaPrimaServicesService){

  }
  
  ngOnInit() {
    this.materiaPrimaServicesService.getMateria_prima_list().subscribe({
      next: (v: any) => this.materias_primasArr = v,
      error: (e: any) => console.error(e),
      complete: () => console.info('complete')
  })
  }
}
