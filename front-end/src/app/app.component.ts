import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { UserdeslogadoComponent } from './components/userdeslogado/userdeslogado.component';
import { UserlogadoComponent } from './components/userlogado/userlogado.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive, UserdeslogadoComponent, UserlogadoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Energize';


  usuariologado = false; //Validação user logado (Implementar)

  usuarioadmin = true; //Validação para ter acesso á todas funcionalidades;
}
