import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EPriscriptionComponent } from './e-priscription.component';

describe('EPriscriptionComponent', () => {
  let component: EPriscriptionComponent;
  let fixture: ComponentFixture<EPriscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EPriscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EPriscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
