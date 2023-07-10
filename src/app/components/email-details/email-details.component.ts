import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-email-details',
  templateUrl: './email-details.component.html',
  styleUrls: ['./email-details.component.css']
})
export class EmailDetailsComponent {
@Input() emailDetails:any;
}
