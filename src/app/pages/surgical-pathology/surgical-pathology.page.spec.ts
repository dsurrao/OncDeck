import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgicalPathologyPage } from './surgical-pathology.page';

describe('SurgicalPathologyPage', () => {
  let component: SurgicalPathologyPage;
  let fixture: ComponentFixture<SurgicalPathologyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurgicalPathologyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurgicalPathologyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
