import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgeryPage } from './surgery.page';

describe('SurgeryPage', () => {
  let component: SurgeryPage;
  let fixture: ComponentFixture<SurgeryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurgeryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurgeryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
