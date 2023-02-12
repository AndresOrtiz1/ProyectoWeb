import { importProvidersFrom, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { MateriaPrima } from '../models/materia_prima.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MateriaPrimaServicesService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getMateria_prima_list(): Observable <MateriaPrima>{
    return this.http.get(`${this.API_URI}/materia-prima`)
  }
  getMateria_pirma(id: string): Observable <MateriaPrima>{
    return this.http.get(`${this.API_URI}/materia-prima/${id}`)

  }

  deleteMateria_pirma(id: string): Observable <MateriaPrima>{
    return this.http.delete(`${this.API_URI}/materia-prima/${id}`)

  }

  saveMateria_prima(materia_prima : MateriaPrima ): Observable <MateriaPrima>{
    return this.http.post(`${this.API_URI}/materia-prima/`,materia_prima)
  }
  
  updateMateria_prima(id: string | number | undefined , updateMateria_prima: MateriaPrima): Observable <MateriaPrima>{
    
    return this.http.put(`${this.API_URI}/materia-prima/${id}`,updateMateria_prima)
  }
   
}
