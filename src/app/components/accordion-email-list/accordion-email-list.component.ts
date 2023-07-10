import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-accordion-email-list',
  templateUrl: './accordion-email-list.component.html',
  styleUrls: ['./accordion-email-list.component.css']
})
export class AccordionEmailListComponent {
  panelOpenState = false;
  @Input() emails: any = [];
}
