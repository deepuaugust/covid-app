import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCreateMedicalComponent } from './request-create.component';

describe('RequestCreateMedicalComponent', () => {
  let component: RequestCreateMedicalComponent;
  let fixture: ComponentFixture<RequestCreateMedicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestCreateMedicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestCreateMedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
