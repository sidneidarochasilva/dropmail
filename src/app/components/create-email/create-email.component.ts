import { Component, OnInit, Output, EventEmitter,OnDestroy } from '@angular/core';
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
export class CreateEmailComponent implements OnInit,OnDestroy  {
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

    let storeSession: any = localStorage.getItem("session");
    let session = JSON.parse(storeSession);

    if (!session) {
      this.createEmail();
    } else {

      this.searchForm.patchValue({
        tempEmail: session.addresses[0].address
      });
      this.getInbox(session.id)
    }
    this.startCountdown();


  }

  ngOnDestroy() {
    this.stopCountdown();
  }



  startCountdown() {
    this.subscription = interval(1000).subscribe(() => {
      this.countdown--;
      if (this.countdown === 0) {
        this.restartCountdown();
        this.callFunction();
      }
    });
  }

  stopCountdown() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  restartCountdown() {
    this.countdown = 15;
  }

  callFunction() {
    let storeSession: any = localStorage.getItem("session");
    let session = JSON.parse(storeSession);
    this.getInbox(session.id)
  }

  createEmail() {

    this.apollo.mutate({
      mutation: CREATE_EMAIL,
    }).subscribe(({ data }: any) => {

      this.searchForm.patchValue({
        tempEmail: data.introduceSession.addresses[0].address
      });

      localStorage.setItem("session", JSON.stringify(data.introduceSession));
      this.error = ''
      this.getInbox(data.introduceSession.id)
    });

  }

  getInbox(id: string) {
   
    this.apollo.query({
      query: GET_MAIL_INBOX,
      variables: {
        id: id,
      }
    }).subscribe(({ data }: any) => {
     
      this.listInbox.emit(data)
    },
      (error: any) => {
        
        this.error='Seu email expirou, aguarde estamos gerando um novo e-mail temporário!'
        this.createEmail()
      } 

    );
  }


  copy(element: HTMLInputElement): void {
    element.select();
    element.setSelectionRange(0, 99999); // Para dispositivos móveis
    document.execCommand("copy");
  }


}