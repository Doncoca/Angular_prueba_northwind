import { Component, OnInit } from '@angular/core';
import { OrdenService } from '../services/orden.service';
import { Order } from '../Models/orders';

@Component({
  selector: 'app-lista-ordenes',
  templateUrl: './lista-ordenes.component.html'
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