import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrossel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrossel.component.html',
  styleUrl: './carrossel.component.css'
})
export class CarrosselComponent {

  images = [
    'assets/imagens/image1.png',  // imagem1 no formato PNG
    'assets/imagens/image2.jpg',  // imagem2 no formato JPG
    'assets/imagens/image3.jpg'   // imagem3 no formato JPG
  ];
  
  
  currentIndex = 0;

  nextSlide(): void {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Volta ao início
    }
  }

  prevSlide(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.images.length - 1; // Volta ao final
    }
  }
}
