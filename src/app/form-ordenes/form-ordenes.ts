import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdenService } from '../services/orden.service';
import { Order } from '../Models/orders';

@Component({
  selector: 'app-form-orden',
  templateUrl: './form-orden.component.html'
})
export class FormOrdenComponent implements OnInit {

  titulo = "Nueva Orden";
  // Modelo inicial
  orden: Order = { OrderID: 0, ShipName: '', ShipVia: 1, Freigth: 0 };

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