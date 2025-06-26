
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { UserdeslogadoComponent } from './components/userdeslogado/userdeslogado.component';
import { UserlogadoComponent } from './components/userlogado/userlogado.component';
import { AuthService, Usuario } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive, UserdeslogadoComponent, UserlogadoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Energize';
  currentUser: Usuario | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  get usuariologado(): boolean {
    return this.authService.isLoggedIn();
  }

  get usuarioadmin(): boolean {
    return this.authService.isAdmin();
  }

  logout() {
    this.authService.logout();
  }
}
