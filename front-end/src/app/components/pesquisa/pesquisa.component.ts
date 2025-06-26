
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pesquisa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pesquisa.component.html',
  styleUrl: './pesquisa.component.css'
})
export class PesquisaComponent {
  searchTerm: string = '';
  activeFilter: string = 'todos';

  onSearchInput(event: any) {
    this.searchTerm = event.target.value;
    console.log('Pesquisando por:', this.searchTerm);
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      console.log('Executando pesquisa:', this.searchTerm);
      // Aqui você pode implementar a lógica de pesquisa
    }
  }

  onFocus() {
    console.log('Campo de pesquisa focado');
  }

  onBlur() {
    console.log('Campo de pesquisa desfocado');
  }

  filterBy(category: string) {
    this.activeFilter = category;
    console.log('Filtro selecionado:', category);
    
    // Remover classe active de todos os filtros e adicionar ao selecionado
    const filterChips = document.querySelectorAll('.filter-chip');
    filterChips.forEach(chip => chip.classList.remove('active'));
    
    const activeChip = Array.from(filterChips).find(chip => 
      chip.textContent?.toLowerCase().includes(category) || category === 'todos'
    );
    
    if (activeChip) {
      activeChip.classList.add('active');
    }
  }
}
