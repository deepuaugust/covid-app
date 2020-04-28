import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestInteractComponent } from './request-interact.component';

describe('RequestInteractComponent', () => {
  let component: RequestInteractComponent;
  let fixture: ComponentFixture<RequestInteractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestInteractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestInteractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});