import { Routes } from '@angular/router';
// IMPORTANTE: Verifica que estas rutas coincidan con tus carpetas reales
import { ListaOrdenesComponent } from './lista-ordenes/lista-ordenes'; 
import { FormOrdenComponent } from './form-ordenes/form-ordenes';

export const routes: Routes = [
    // 1. Canal por defecto: Si la ruta está vacía, ir a 'ordenes'
    { path: '', redirectTo: 'ordenes', pathMatch: 'full' },

    // 2. Canal de la Tabla
    { path: 'ordenes', component: ListaOrdenesComponent },

    // 3. Canal de Crear
    { path: 'crear', component: FormOrdenComponent },

    // 4. Canal de Editar (recibe un ID)
    { path: 'editar/:id', component: FormOrdenComponent }
];