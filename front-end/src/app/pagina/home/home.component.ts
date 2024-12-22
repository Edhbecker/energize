import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { PesquisaComponent } from '../../components/pesquisa/pesquisa.component';
import { CarrosselComponent } from '../../components/carrossel/carrossel.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, FooterComponent, PesquisaComponent, CarrosselComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  cards = [
    { 
      titulo: 'Óleo de Coco', 
      descricao: 'Óleo de coco 100% natural para uso culinário e estético.', 
      categoria: 'Alimentação Saudável', 
      imagem: 'assets/imagens/image4.jpg' 
    },
    { 
      titulo: 'Chá Verde', 
      descricao: 'Chá verde orgânico com propriedades antioxidantes.', 
      categoria: 'Fitoterápicos', 
      imagem: 'assets/imagens/image4.jpg' 
    },
    { 
      titulo: 'Shampoo Natural', 
      descricao: 'Shampoo livre de parabenos e sulfatos, ideal para cabelos sensíveis.', 
      categoria: 'Cuidados Pessoais', 
      imagem: 'assets/imagens/image4.jpg' 
    },
    { 
      titulo: 'Protetor Solar Natural', 
      descricao: 'Protetor solar ecológico e biodegradável.', 
      categoria: 'Cuidados Pessoais', 
      imagem: 'assets/imagens/image4.jpg' 
    },
    { 
      titulo: 'Farinha de Amêndoas', 
      descricao: 'Farinha de amêndoas para receitas sem glúten.', 
      categoria: 'Alimentação Saudável', 
      imagem: 'assets/imagens/image4.jpg' 
    },
    { 
      titulo: 'Suplemento de Vitamina C', 
      descricao: 'Vitamina C natural para reforço do sistema imunológico.', 
      categoria: 'Suplementos', 
      imagem: 'assets/imagens/image4.jpg' 
    },
    { 
      titulo: 'Óleo Essencial de Lavanda', 
      descricao: 'Óleo essencial calmante e relaxante para aromaterapia.', 
      categoria: 'Fitoterápicos', 
      imagem: 'assets/imagens/image4.jpg' 
    },
    { 
      titulo: 'Granola Integral', 
      descricao: 'Granola integral com frutas secas, rica em fibras.', 
      categoria: 'Alimentação Saudável', 
      imagem: 'assets/imagens/image4.jpg' 
    }
  ];
  

  

  /*
  categorias = ['Alimentação Saudável', 'Cuidados Pessoais', 'Fitoterápicos', 'Suplementos'];
  cardsFiltrados = this.cards;

  // Categoria selecionada
  categoriaSelecionada: string | null = null;

  filtrarPorCategoria(categoria: string) {
    this.categoriaSelecionada = categoria;
    this.cardsFiltrados = this.cards.filter(card => card.categoria === categoria);
  }
    */
}
