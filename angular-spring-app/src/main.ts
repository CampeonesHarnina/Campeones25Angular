import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { AppRoutingModule } from './app/app-routing.module';
import { authInterceptor } from './app/services/auth.interceptor'; // Ajusta la ruta según tu estructura

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])), // Registra el interceptor
    importProvidersFrom(AppRoutingModule)
  ]
}).catch(err => console.error(err));