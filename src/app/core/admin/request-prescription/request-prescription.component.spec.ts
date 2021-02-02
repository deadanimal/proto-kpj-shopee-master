import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPrescriptionComponent } from './request-prescription.component';

describe('RequestPrescriptionComponent', () => {
  let component: RequestPrescriptionComponent;
  let fixture: ComponentFixture<RequestPrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestPrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
