import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientFormPage } from './patient-form.page';

describe('PatientFormPage', () => {
  let component: PatientFormPage;
  let fixture: ComponentFixture<PatientFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
