import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from './auth.service'; // Ajusta la ruta según tu estructura

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const authService = inject(AuthService); // Inyecta el AuthService
    const token = authService.getToken();    // Obtiene el token del AuthService

    if (token) {
        // Clona la solicitud y agrega el encabezado de autorización
        const cloned = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        return next(cloned); // Pasa la solicitud modificada al siguiente manejador
    }

    return next(req); // Pasa la solicitud original si no hay token
}