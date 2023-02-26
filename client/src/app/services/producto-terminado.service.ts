import { importProvidersFrom, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Producto_terminado } from '../models/producto_terminado';

@Injectable({
  providedIn: 'root'
})
export class ProductoTerminadoService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getProducto_terminadolist(): Observable <Producto_terminado>{
    return this.http.get(`${this.API_URI}/producto_terminado`)
  }
  getProducto_terminado(id_terminado: string): Observable <Producto_terminado>{
    return this.http.get(`${this.API_URI}/producto_terminado/${id_terminado}`)

  }

  deleteProducto_terminado(id_terminado: string): Observable <Producto_terminado>{
    return this.http.delete(`${this.API_URI}/producto_terminado/${id_terminado}`)

  }

  saveProducto_terminado(producto_terminado : Producto_terminado ): Observable <Producto_terminado>{
    return this.http.post(`${this.API_URI}/producto_terminado/`,producto_terminado)
  }
  
  updateProducto_terminado(id_terminado: string | number | undefined , updateProducto_terminado: Producto_terminado): Observable <Producto_terminado>{
    
    return this.http.put(`${this.API_URI}/producto_terminado/${id_terminado}`,updateProducto_terminado)
  }

  
}
