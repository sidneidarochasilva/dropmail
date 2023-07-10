import { Component, Input, Output, EventEmitter,OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.css']
})
export class EmailListComponent implements OnChanges {

  @Input() emails: any = [];
  @Output() selectedEmail = new EventEmitter<any>();
  selected: any


  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.emails = this.emails;
    
  }
  
  selectEmail(email: any) {
    this.selectedEmail.emit(email);
    this.selected = email
  }

}
