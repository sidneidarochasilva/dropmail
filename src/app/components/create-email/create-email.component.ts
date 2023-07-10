import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { interval, Subscription } from 'rxjs';
import { CREATE_EMAIL, GET_MAIL_INBOX } from '../../graphql.operations';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-create-email',
  templateUrl: './create-email.component.html',
  styleUrls: ['./create-email.component.css']
})
export class CreateEmailComponent implements OnInit, OnDestroy {
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  error: any;
  countdown = 15;
  subscription!: Subscription;
  @Output() listInbox = new EventEmitter<any>();

  searchForm = new FormGroup({
    tempEmail: new FormControl(),
  });

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {

    // Obtém a sessão armazenada localmente
    let storeSession: any = localStorage.getItem("session");
    let session = JSON.parse(storeSession);

    if (!session) {
      this.createEmail(); // Cria um novo e-mail temporário se a sessão não existir
    } else {
      // Preenche o formulário de pesquisa com o endereço de e-mail temporário atual
      this.searchForm.patchValue({
        tempEmail: session.addresses[0].address
      });
      this.getInbox(session.id); // Obtém a caixa de entrada para a sessão existente
    }
    this.startCountdown(); // Inicia a contagem regressiva

  }

  ngOnDestroy() {
    this.stopCountdown(); // Cancela a contagem regressiva ao destruir o componente
  }

  /**
   * Inicia a contagem regressiva.
   */
  startCountdown() {
    this.subscription = interval(1000).subscribe(() => {
      this.countdown--;
      if (this.countdown === 0) {
        this.restartCountdown();
        this.callFunction();
      }
    });
  }

  /**
   * Para a contagem regressiva.
   */
  stopCountdown() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * Reinicia a contagem regressiva.
   */
  restartCountdown() {
    this.countdown = 15;
  }

  /**
   * Chama a função para obter a caixa de entrada.
   */
  callFunction() {
    let storeSession: any = localStorage.getItem("session");
    let session = JSON.parse(storeSession);
    this.getInbox(session.id);
  }

  /**
   * Cria um novo e-mail temporário.
   */
  createEmail() {
    this.apollo.mutate({
      mutation: CREATE_EMAIL,
    }).subscribe(({ data }: any) => {
      // Preenche o formulário de pesquisa com o novo endereço de e-mail temporário
      this.searchForm.patchValue({
        tempEmail: data.introduceSession.addresses[0].address
      });
      localStorage.setItem("session", JSON.stringify(data.introduceSession)); // Armazena a nova sessão localmente
      this.error = '';
      this.getInbox(data.introduceSession.id); // Obtém a caixa de entrada para a nova sessão
    });
  }

  /**
   * Obtém a caixa de entrada para a sessão especificada.
   * @param id O ID da sessão.
   */
  getInbox(id: string) {
    this.apollo.query({
      query: GET_MAIL_INBOX,
      variables: {
        id: id,
      }
    }).subscribe(({ data }: any) => {
      this.listInbox.emit(data); // Emite o evento 'listInbox' com os dados da caixa de entrada
    },
      (error: any) => {
        this.error = 'Seu email expirou, aguarde estamos gerando um novo e-mail temporário!';
        this.createEmail(); // Cria um novo e-mail temporário se a sessão expirou
      });
  }

  /**
   * Copia o conteúdo de um elemento para a área de transferência.
   * @param element O elemento HTML a ser copiado.
   */
  copy(element: HTMLInputElement): void {
    element.select();
    element.setSelectionRange(0, 99999); // Para dispositivos móveis
    document.execCommand("copy");
  }
}
