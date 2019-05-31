import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathologySurgeryPage } from './pathology-surgery.page';

describe('PathologySurgeryPage', () => {
  let component: PathologySurgeryPage;
  let fixture: ComponentFixture<PathologySurgeryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathologySurgeryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathologySurgeryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
