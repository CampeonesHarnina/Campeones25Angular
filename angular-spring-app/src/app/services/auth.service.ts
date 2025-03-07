import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = `${environment.apiUrl}`;

    constructor(private http: HttpClient) { }

    login(email: string, password: string): Observable<AuthResponse> {
        const credentials = { email, password };
        return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials);
    }

    register(user: User): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/usuarios/register`, user);
    }

    saveToken(authResponse: AuthResponse): void {
        localStorage.setItem('access_token', authResponse.access_token);
        localStorage.setItem('refresh_token', authResponse.refresh_token);
        localStorage.setItem('user', authResponse.usuario);
    }

    getToken(): string | null {
        return localStorage.getItem('access_token');
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    logout(): void {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
    }
}