
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-criarconta',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './criarconta.component.html',
  styleUrl: './criarconta.component.css'
})
export class CriarcontaComponent {
  nome: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'As senhas não coincidem';
      return;
    }

    if (this.nome && this.email && this.password) {
      this.isLoading = true;
      this.errorMessage = '';
      
      this.authService.registrar(this.nome, this.email, this.password).subscribe({
        next: (response) => {
          console.log('Conta criada com sucesso:', response);
          this.isLoading = false;
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Erro ao criar conta:', error);
          this.errorMessage = error.error?.error || 'Erro ao criar conta';
          this.isLoading = false;
        }
      });
    }
  }
}
