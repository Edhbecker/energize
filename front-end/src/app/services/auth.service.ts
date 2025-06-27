
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  id: number;
  nome: string;
  email: string;
  perfil: 'ADMIN' | 'CLIENTE';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Usuários fictícios para teste
  private usuarios: User[] = [
    {
      id: 1,
      nome: 'Admin User',
      email: 'admin@energize.com',
      perfil: 'ADMIN'
    },
    {
      id: 2,
      nome: 'Cliente User',
      email: 'cliente@energize.com',
      perfil: 'CLIENTE'
    }
  ];

  constructor() {
    // Verificar se há um usuário logado no localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(email: string, senha: string): boolean {
    // Simular login - aceitar qualquer senha para os emails dos usuários fictícios
    const user = this.usuarios.find(u => u.email === email);
    
    if (user) {
      this.currentUserSubject.next(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.perfil === 'ADMIN';
  }

  isCliente(): boolean {
    const user = this.getCurrentUser();
    return user?.perfil === 'CLIENTE';
  }

  // Método para obter usuários fictícios (para facilitar os testes)
  getUsuariosFicticios(): User[] {
    return this.usuarios;
  }
}
