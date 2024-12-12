import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { PesquisaComponent } from '../../components/pesquisa/pesquisa.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, FooterComponent, PesquisaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
