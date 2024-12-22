import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  link_facebook = "https://www.facebook.com/deise.becker.77";
  link_instagram = "https://www.instagram.com/energizeprodutosnaturais/";
  link_whatsapp = "https://wa.me/555180541126?text=Ol%C3%A1%2C%20tudo%20bem%3F%20%F0%9F%98%8A%20Encontrei%20a%20loja%20de%20voc%C3%AAs%20pelo%20site%20e%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20produtos%20naturais.%20Podem%20me%20ajudar%3F";


}
