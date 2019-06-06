import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiopsyNotIndicatedComponent } from './biopsy-not-indicated.component';

describe('BiopsyNotIndicatedComponent', () => {
  let component: BiopsyNotIndicatedComponent;
  let fixture: ComponentFixture<BiopsyNotIndicatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiopsyNotIndicatedComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiopsyNotIndicatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
