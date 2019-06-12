import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiationTherapyPage } from './radiation-therapy.page';

describe('RadiationTherapyPage', () => {
  let component: RadiationTherapyPage;
  let fixture: ComponentFixture<RadiationTherapyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadiationTherapyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiationTherapyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
