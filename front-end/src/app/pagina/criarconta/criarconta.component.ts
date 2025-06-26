
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-criarconta',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './criarconta.component.html',
  styleUrl: './criarconta.component.css'
})
export class CriarcontaComponent {
  formData = {
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    confirmarSenha: ''
  };
  
  aceiteTermos: boolean = false;
  receberEmails: boolean = false;
  isLoading: boolean = false;

  onSubmit() {
    if (this.isFormValid()) {
      this.isLoading = true;
      // Simular cadastro - implementar lógica real aqui
      setTimeout(() => {
        console.log('Cadastro realizado:', this.formData);
        this.isLoading = false;
        // Redirecionar após cadastro bem-sucedido
      }, 1500);
    }
  }

  isFormValid(): boolean {
    return !!(
      this.formData.nome &&
      this.formData.email &&
      this.formData.telefone &&
      this.formData.senha &&
      this.formData.confirmarSenha &&
      this.formData.senha === this.formData.confirmarSenha &&
      this.aceiteTermos
    );
  }

  signupWithGoogle() {
    console.log('Cadastro com Google');
    // Implementar integração com Google OAuth
  }

  signupWithApple() {
    console.log('Cadastro com Apple');
    // Implementar integração com Apple Sign-In
  }
}
