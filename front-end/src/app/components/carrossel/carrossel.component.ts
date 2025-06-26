import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrossel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrossel.component.html',
  styleUrl: './carrossel.component.css'
})
export class CarrosselComponent implements OnInit, OnDestroy {

  images = [
    'assets/imagens/image1.png',  // imagem1 no formato PNG
    'assets/imagens/image2.jpg',  // imagem2 no formato JPG
    'assets/imagens/image3.jpg'   // imagem3 no formato JPG
  ];
  
  currentIndex = 0;
  private intervalId: any;

  ngOnInit(): void {
    this.startAutoRotation();
  }

  ngOnDestroy(): void {
    this.stopAutoRotation();
  }

  startAutoRotation(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 3000); // 3 segundos
  }

  stopAutoRotation(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextSlide(): void {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Volta ao início
    }
  }

  prevSlide(): void {
    this.stopAutoRotation(); // Para a rotação automática quando usuário interage
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.images.length - 1; // Volta ao final
    }
    this.startAutoRotation(); // Reinicia a rotação automática
  }

  onNextClick(): void {
    this.stopAutoRotation(); // Para a rotação automática quando usuário interage
    this.nextSlide();
    this.startAutoRotation(); // Reinicia a rotação automática
  }
}
