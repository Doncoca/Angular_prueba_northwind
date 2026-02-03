import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 
import { OrdenService } from '../services/orden.service';
import { Order } from '../Models/orders'; // <--- Probablemente sea esta ruta// ... tus otros imports

@Component({
  selector: 'app-lista-ordenes',
  standalone: true,  
  imports: [CommonModule, RouterModule], 
  templateUrl: './lista-ordenes.html',
  styleUrls: ['./lista-ordenes.css']
})
export class ListaOrdenesComponent implements OnInit {

  lista: Order[] = [];

  constructor(private servicio: OrdenService) { }

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.servicio.getAll().subscribe({
      next: (resp) => {
        // Asumiendo que tu API devuelve { data: [...] }
        if (resp.exito) this.lista = resp.data;
      },
      error: (e) => console.error("Error cargando:", e)
    });
  }

  eliminar(id: number) {
    if (confirm("¿Seguro que quieres borrar la orden #" + id + "?")) {
      this.servicio.delete(id).subscribe(() => {
        alert("Eliminado");
        this.cargar(); // Recargamos la tabla
      });
    }
  }
}