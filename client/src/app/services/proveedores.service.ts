import {importProvidersFrom, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Proveedores } from '../models/proveedores.models';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  
  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getProveedoreslist(): Observable <Proveedores>{
    return this.http.get(`${this.API_URI}/proveedores`)
  }
  getProveedores(id: string): Observable <Proveedores>{
    return this.http.get(`${this.API_URI}/proveedores/${id}`)

  }

  deleteProveedores(id: string): Observable <Proveedores>{
    return this.http.delete(`${this.API_URI}/proveedores/${id}`)

  }

  saveProveedores(proveedores : Proveedores ): Observable <Proveedores>{
    return this.http.post(`${this.API_URI}/proveedores/`,proveedores)
  }
  
  updateProveedores(id: string | number | undefined , updateProveedores: Proveedores): Observable <Proveedores>{
    
    return this.http.put(`${this.API_URI}/proveedores/${id}`,updateProveedores)
  }
}
