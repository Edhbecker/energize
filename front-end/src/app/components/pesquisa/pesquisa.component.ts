
import { Component, Output, EventEmitter } from '@angular/core';
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

  @Output() categoriaFiltrada = new EventEmitter<string>();

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
    
    // Emitir evento para o componente pai
    this.categoriaFiltrada.emit(category);
  }
}
