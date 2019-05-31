import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiopsyStatusPage } from './biopsy-status.page';

describe('BiopsyStatusPage', () => {
  let component: BiopsyStatusPage;
  let fixture: ComponentFixture<BiopsyStatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiopsyStatusPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiopsyStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
