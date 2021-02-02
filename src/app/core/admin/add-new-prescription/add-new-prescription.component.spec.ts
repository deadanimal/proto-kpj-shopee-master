import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPrescriptionComponent } from './add-new-prescription.component';

describe('AddNewPrescriptionComponent', () => {
  let component: AddNewPrescriptionComponent;
  let fixture: ComponentFixture<AddNewPrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewPrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
