import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsNonMedicalComponent } from './requests-nonmedical.component';

describe('RequestsNonMedicalComponent', () => {
  let component: RequestsNonMedicalComponent;
  let fixture: ComponentFixture<RequestsNonMedicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsNonMedicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsNonMedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
