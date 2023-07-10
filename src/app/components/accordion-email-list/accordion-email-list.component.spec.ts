import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionEmailListComponent } from './accordion-email-list.component';

describe('AccordionEmailListComponent', () => {
  let component: AccordionEmailListComponent;
  let fixture: ComponentFixture<AccordionEmailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccordionEmailListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccordionEmailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
