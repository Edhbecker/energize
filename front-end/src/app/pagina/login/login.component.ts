
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

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

  onSubmit() {
    if (this.email && this.password) {
      this.isLoading = true;
      // Simular login - implementar lógica real aqui
      setTimeout(() => {
        console.log('Login realizado:', { email: this.email, password: this.password });
        this.isLoading = false;
        // Redirecionar após login bem-sucedido
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
