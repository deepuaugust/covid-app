import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCreateNonMedicalComponent } from './request-create.component';

describe('RequestCreateNonMedicalComponent', () => {
  let component: RequestCreateNonMedicalComponent;
  let fixture: ComponentFixture<RequestCreateNonMedicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestCreateNonMedicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestCreateNonMedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
