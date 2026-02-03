import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
// IMPORTANTE: Importar esto para conectar con C#
import { provideHttpClient, withFetch } from '@angular/common/http'; 

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Aquí conectamos tus rutas del paso 1
    provideHttpClient(withFetch()) // <--- ESTO ES VITAL PARA TU API
  ]
};