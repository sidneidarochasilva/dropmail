import { Component, Renderer2 } from '@angular/core';
import { IEmail } from 'src/app/interfaces/IEmail';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isNotification = Notification.permission !== 'granted' ? false : true;
  emails: any = [];
  email:any;

  constructor(private renderer: Renderer2) { }
      
  /**
   * Método chamado quando um e-mail é selecionado.
   * @param email O e-mail selecionado.
   */
  onSelectedEmail(email: IEmail) {
    this.email = email;
  }

  /**
   * Método chamado quando a lista de e-mails da caixa de entrada é atualizada.
   * @param listInBox Objeto contendo a lista de e-mails da sessão.
   */
  onListInbox(listInBox: IEmail) {
    if (this.emails.length < listInBox.session.mails.length) {
      this.showNotification();
    }
    this.emails = listInBox.session.mails;
  }

  /**
   * Envia uma notificação.
   */
  sendNotification() {
    if (this.isNotification) {
      if (Notification.permission !== 'granted') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            this.notificationsActived();
          }
        });
      } else {
        this.notificationsActived();
      }
    }
  }

  /**
   * Mostra uma notificação informando sobre um novo e-mail.
   */
  private showNotification() {
    const options = {
      body: 'Novo e-mail',
      icon: ''
    };
    const notification = new Notification('Notificação de novo e-mail', options);
  }

  /**
   * Mostra uma notificação informando que as notificações estão ativadas no navegador.
   */
  notificationsActived() {
    const options = {
      body: 'Notificações ativadas',
      icon: ''
    };
    const notification = new Notification('Verifique se as notificações estão ativadas em seu navegador.', options);
  }
}
