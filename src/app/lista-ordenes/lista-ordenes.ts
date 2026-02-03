import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrdenService } from '../services/orden.service';
import { Orden } from '../Models/orders'; // Asegúrate que la ruta sea correcta

@Component({
  selector: 'app-lista-ordenes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-ordenes.html',
  styleUrls: ['./lista-ordenes.css']
})
export class ListaOrdenesComponent implements OnInit {

  // 1. Dos listas: Una con TODO y otra con lo que SE VE
  listaCompleta: Orden[] = []; 
  listaVisible: Orden[] = [];

  // 2. Variables de paginación
  paginaActual: number = 1;
  itemsPorPagina: number = 50;
  totalPaginas: number = 0;

  constructor(private servicio: OrdenService) { }

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.servicio.getAll().subscribe({
      next: (resp) => {
        console.log("Datos recibidos:", resp);
        
        // CORRECCIÓN CRÍTICA: Sacamos los datos de la caja .data
        // Si resp.data existe, úsalo. Si no, usa resp (por si acaso).
        const datosReales = resp.data || resp;

        this.listaCompleta = datosReales;
        this.totalPaginas = Math.ceil(this.listaCompleta.length / this.itemsPorPagina);
        
        // Al cargar, mostramos la página 1
        this.actualizarVista();
      },
      error: (e) => console.error("Error:", e)
    });
  }

  // Método mágico que corta el array para mostrar solo 10
  actualizarVista() {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    this.listaVisible = this.listaCompleta.slice(inicio, fin);
  }

  // Botones Anterior / Siguiente
  cambiarPagina(delta: number) {
    const nuevaPagina = this.paginaActual + delta;
    
    // Validar que no se salga de los límites
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina;
      this.actualizarVista();
    }
  }

  eliminar(id: number) {
    if (confirm("¿Borrar orden " + id + "?")) {
      this.servicio.delete(id).subscribe(() => {
        this.cargar(); // Recargamos todo
      });
    }
  }
}