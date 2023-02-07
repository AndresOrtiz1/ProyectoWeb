import { Component, OnInit } from '@angular/core';
import { MateriaPrima } from 'src/app/models/materia_prima.models';

import { MateriaPrimaServicesService } from '../../services/materia-prima.services.service'

@Component({
  selector: 'app-materia-prima',
  templateUrl: './materia-prima.component.html',
  styleUrls: ['./materia-prima.component.css']
})
export class MateriaPrimaComponent implements OnInit{
  
  materias_primas: any = [];

  constructor(private materiaPrimaServicesService: MateriaPrimaServicesService){

  }
  
  ngOnInit() {
    this.materiaPrimaServicesService.getMateria_prima_list().subscribe(
      res =>{
        this.materias_primas =res;
      },
      err => console.log(err)
    );
  }
}
