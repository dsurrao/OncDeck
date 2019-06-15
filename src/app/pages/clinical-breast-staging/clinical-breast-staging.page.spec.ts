import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalBreastStagingPage } from './clinical-breast-staging.page';

describe('ClinicalBreastStagingPage', () => {
  let component: ClinicalBreastStagingPage;
  let fixture: ComponentFixture<ClinicalBreastStagingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicalBreastStagingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalBreastStagingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
