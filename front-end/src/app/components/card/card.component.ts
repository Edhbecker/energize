import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() titulo: string = '';       // Recebe o título do card
  @Input() descricao: string = '';   // Recebe a descrição do card
  @Input() categoria: string = '';   // Recebe a categoria do card
  @Input() imagem: string = '';      // Recebe o caminho ou URL da imagem
  //@Input() especificacao: string = ''; //Será utilizado na nova página do produto com mais detalhes
}
