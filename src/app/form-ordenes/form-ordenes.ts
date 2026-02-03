import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; // <--- ESTA ES LA CLAVE
import { OrdenService } from '../services/orden.service';
import { Order } from '../Models/orders';
// ...
@Component({
  selector: 'app-form-ordenes',
  templateUrl: './form-ordenes.html',
  imports: [CommonModule, FormsModule], 
  styleUrls: ['./form-ordenes.css']    
})
export class FormOrdenComponent implements OnInit {

  titulo = "Nueva Orden";
  // Modelo inicial
  orden: Order = { OrderID: 0, ShipName: '', ShipVia: 1, Freight: 0 };

  constructor(
    private servicio: OrdenService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Verificar si hay ID en la URL (Modo Editar)
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.titulo = "Editar Orden #" + id;
      // Llamamos al método nuevo del Paso 0
      this.servicio.getById(Number(id)).subscribe(data => {
        this.orden = data; // Rellena el formulario
      });
    }
  }

  guardar() {
    if (this.orden.OrderID > 0) {
      // Editar
      this.servicio.update(this.orden).subscribe(() => {
        alert("¡Actualizado!");
        this.router.navigate(['/ordenes']);
      });
    } else {
      // Crear
      this.servicio.create(this.orden).subscribe(() => {
        alert("¡Creado!");
        this.router.navigate(['/ordenes']);
      });
    }
  }
}