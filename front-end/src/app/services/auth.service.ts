
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Usuario {
  idusuario: number;
  nome: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  usuario: Usuario;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000';
  private currentUserSubject: BehaviorSubject<Usuario | null>;
  public currentUser: Observable<Usuario | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Usuario | null>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Usuario | null {
    return this.currentUserSubject.value;
  }

  registrar(nome: string, email: string, senha: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/registrar`, { nome, email, senha })
      .pipe(map(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.usuario));
        this.currentUserSubject.next(response.usuario);
        return response;
      }));
  }

  login(email: string, senha: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, { email, senha })
      .pipe(map(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.usuario));
        this.currentUserSubject.next(response.usuario);
        return response;
      }));
  }

  loginGoogle(token: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/google`, { token })
      .pipe(map(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.usuario));
        this.currentUserSubject.next(response.usuario);
        return response;
      }));
  }

  loginApple(identityToken: string, user: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/apple`, { identityToken, user })
      .pipe(map(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.usuario));
        this.currentUserSubject.next(response.usuario);
        return response;
      }));
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const user = this.currentUserValue;
    return user?.role === 'admin';
  }
}
