import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiopsyPage } from './biopsy.page';

describe('BiopsyPage', () => {
  let component: BiopsyPage;
  let fixture: ComponentFixture<BiopsyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiopsyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiopsyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
