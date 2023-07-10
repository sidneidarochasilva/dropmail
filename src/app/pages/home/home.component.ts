import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isNotification = Notification.permission !== 'granted' ? false : true;
  emails: any = [];
  email: any;

  constructor(private renderer: Renderer2) { }

  onSelectedEmail(email: any) {
   
    this.email = email;
  }

  onListInbox(listInBox: any) {
   
    if (this.emails.length < listInBox.session.mails.length) {
      this.showNotification();
    }

    this.emails = listInBox.session.mails;
  }

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

  private showNotification() {
    const options = {
      body: 'Novo e-mail',
      icon: ''
    };
    const notification = new Notification('Notificação de novo e-mail', options);
  }

  notificationsActived(){
    const options = {
      body: 'Notificações ativadas',
      icon: ''
    };
    const notification = new Notification('Verifique se as notificações estão ativadas em seu navegador.', options);
  }

}
