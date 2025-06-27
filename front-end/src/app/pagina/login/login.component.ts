
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../../services/auth.service';

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
  usuariosFicticios: User[] = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.usuariosFicticios = this.authService.getUsuariosFicticios();
  }

  onSubmit() {
    if (this.email && this.password) {
      this.isLoading = true;
      this.errorMessage = '';
      
      setTimeout(() => {
        const loginSuccess = this.authService.login(this.email, this.password);
        
        if (loginSuccess) {
          console.log('Login realizado com sucesso');
          this.router.navigate(['/']);
        } else {
          this.errorMessage = 'Email não encontrado. Use um dos emails de teste.';
        }
        
        this.isLoading = false;
      }, 1500);
    }
  }

  loginWithGoogle() {
    console.log('Login com Google');
    // Implementar integração com Google OAuth
  }

  loginWithApple() {
    console.log('Login com Apple');
    // Implementar integração com Apple Sign-In
  }
}
