import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { IEmail } from 'src/app/interfaces/IEmail';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.css']
})
export class EmailListComponent implements OnChanges {

  @Input() emails: any = []; // Lista de e-mails recebidos como entrada para o componente
  @Output() selectedEmail = new EventEmitter<any>(); // Evento emitido quando um e-mail é selecionado
  selected: any; // E-mail selecionado atualmente

  ngOnChanges(changes: SimpleChanges): void {
  
    this.emails = this.emails; // Atualiza a lista de e-mails local com a lista de e-mails recebida
  }

  /**
   * Seleciona um e-mail e emite o evento 'selectedEmail' com o e-mail selecionado.
   * @param email O e-mail selecionado.
   */
  selectEmail(email: IEmail) {
    this.selectedEmail.emit(email); // Emite o evento 'selectedEmail' com o e-mail selecionado como argumento
    this.selected = email; // Atualiza o e-mail selecionado atualmente
  }
}
