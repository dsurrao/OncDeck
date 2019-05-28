import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutModalPage } from './logout-modal.page';

describe('LogoutModalPage', () => {
  let component: LogoutModalPage;
  let fixture: ComponentFixture<LogoutModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoutModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
