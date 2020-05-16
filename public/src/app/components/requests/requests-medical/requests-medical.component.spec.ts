import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsMedicalComponent } from './requests-medical.component';

describe('RequestsComponent', () => {
  let component: RequestsMedicalComponent;
  let fixture: ComponentFixture<RequestsMedicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsMedicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsMedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
