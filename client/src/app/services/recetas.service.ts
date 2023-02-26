import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Recetas } from '../models/recetas.models';

@Injectable({
  providedIn: 'root'
})
export class RecetasService {

  
  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getRecetaslist(): Observable <Recetas>{
    return this.http.get(`${this.API_URI}/recetas`)
  }
  getRecetas(id: string): Observable <Recetas>{
    return this.http.get(`${this.API_URI}/recetas/${id}`)

  }
}
