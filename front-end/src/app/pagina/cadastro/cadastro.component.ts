import { Component } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  isPopupVisible = false;
  fileName: string = '';

  openUploadPopup() {
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileName = file.name;
    }
  }

  addRow() {
    // Implementar lógica para adicionar uma nova linha na tabela
  }
}
