
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.email && this.password) {
      this.isLoading = true;
      this.errorMessage = '';
      
      this.authService.login(this.email, this.password).subscribe({
        next: (response) => {
          console.log('Login realizado com sucesso:', response);
          this.isLoading = false;
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Erro no login:', error);
          this.errorMessage = error.error?.error || 'Erro ao fazer login';
          this.isLoading = false;
        }
      });
    }
  }

  loginWithGoogle() {
    console.log('Login com Google');
    // Implementar integração com Google OAuth
    // Por enquanto, simulando um token
    const mockToken = 'mock_google_token';
    this.authService.loginGoogle(mockToken).subscribe({
      next: (response) => {
        console.log('Login Google realizado:', response);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Erro no login Google:', error);
        this.errorMessage = 'Erro ao fazer login com Google';
      }
    });
  }

  loginWithApple() {
    console.log('Login com Apple');
    // Implementar integração com Apple Sign-In
    const mockUser = {
      email: 'user@apple.com',
      firstName: 'Apple',
      lastName: 'User'
    };
    this.authService.loginApple('mock_apple_token', mockUser).subscribe({
      next: (response) => {
        console.log('Login Apple realizado:', response);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Erro no login Apple:', error);
        this.errorMessage = 'Erro ao fazer login com Apple';
      }
    });
  }
}
