import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order, APIResponse } from '../Models/orders';
import { Orden } from './orden';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {
  
  // 🔴 ¡VERIFICA TU PUERTO AQUÍ!
  private apiUrl = 'https://localhost:7153/api/Orders'; 

  constructor(private http: HttpClient) { }

  getAll(): Observable<APIResponse> {
    return this.http.get<APIResponse>(this.apiUrl);
  }

  getById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  create(orden: Order): Observable<any> {
    return this.http.post(this.apiUrl, orden);
  }

  update(orden: Order): Observable<any> {
    return this.http.put(`${this.apiUrl}/${orden.OrderID}`, orden);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}