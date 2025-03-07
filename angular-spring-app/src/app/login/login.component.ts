import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Necesario para ngModel
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Añadido para *ngIf
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule], // Añade CommonModule aquí
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.authService.saveToken(response);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errorMessage = 'Error al iniciar sesión: ' + (err.error?.error || 'Credenciales inválidas');
      }
    });
  }
}