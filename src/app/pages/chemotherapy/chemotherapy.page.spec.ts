import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChemotherapyPage } from './chemotherapy.page';

describe('ChemotherapyPage', () => {
  let component: ChemotherapyPage;
  let fixture: ComponentFixture<ChemotherapyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChemotherapyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChemotherapyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
