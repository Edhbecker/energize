import { Component, ElementRef, HostListener, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-userdeslogado',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './userdeslogado.component.html',
  styleUrls: ['./userdeslogado.component.css']
})
export class UserdeslogadoComponent implements AfterViewInit {

  constructor(private elRef: ElementRef, private router: Router) {}

  ngAfterViewInit() {
    const checkbox = this.elRef.nativeElement.querySelector('input[type="checkbox"]');
    checkbox.checked = false; // Garantir que o checkbox está desmarcado ao iniciar
  }

  // Método para detectar cliques fora da popup
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const popup = this.elRef.nativeElement.querySelector('.popup');
    const inputCheckbox = this.elRef.nativeElement.querySelector('input[type="checkbox"]');
    
    // Verifica se o clique foi dentro de um botão
    const clickedButton = (event.target as HTMLElement).closest('button');
    
    if (clickedButton) {
      // Verifica o texto dentro do botão (se for "Cadastre-se" ou "Entre")
      const span = clickedButton.querySelector('span.name');
      if (span) {
        const textClicked = span.textContent?.trim();
        if (textClicked === 'Cadastre-se') {
          console.log('Clique em Cadastre-se');
          // Navegar para a página de cadastro
          this.router.navigate(['/signup']);
        } else if (textClicked === 'Entre') {
          console.log('Clique em Entre');
          // Navegar para a página de login
          this.router.navigate(['/login']);
        }
      }
    }

    // Se o clique foi fora do popup ou do checkbox, fecha a popup
    if (!popup.contains(event.target as Node) && !inputCheckbox.contains(event.target as Node)) {
      inputCheckbox.checked = false;
    }
  }
}
