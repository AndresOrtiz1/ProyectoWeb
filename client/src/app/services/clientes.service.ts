import {importProvidersFrom, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Clientes } from '../models/clientes.models';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  
  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getClienteslist(): Observable <Clientes>{
    return this.http.get(`${this.API_URI}/clientes`)
  }
  getClientes(id: string): Observable <Clientes>{
    return this.http.get(`${this.API_URI}/clientes/${id}`)

  }

  deleteClientes(id: string): Observable <Clientes>{
    return this.http.delete(`${this.API_URI}/clientes/${id}`)

  }

  saveClientes(clientes : Clientes ): Observable <Clientes>{
    return this.http.post(`${this.API_URI}/clientes/`,clientes)
  }
  
  updateClientes(id: string | number | undefined , updateClientes: Clientes): Observable <Clientes>{
    
    return this.http.put(`${this.API_URI}/clientes/${id}`,updateClientes)
  }
}
