import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orden } from '../Models/orders'; // <--- Asegúrate que apunte a tu archivo real
@Injectable({
  providedIn: 'root'
})
export class OrdenService {
  
  // 🔴 ¡VERIFICA TU PUERTO AQUÍ!
  private apiUrl = 'http://localhost:5146/Orders'; 

  constructor(private http: HttpClient) { }

getAll(): Observable<any> {
  return this.http.get<any>(this.apiUrl);
}

  getById(id: number): Observable<Orden> {
    return this.http.get<Orden>(`${this.apiUrl}/${id}`);
  }

  create(orden: Orden): Observable<any> {
    return this.http.post(this.apiUrl, orden);
  }

  update(orden: Orden): Observable<any> {
    return this.http.put(`${this.apiUrl}/${orden.orderID}`, orden);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}