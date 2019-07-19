import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotScheduledSurgeryComponent } from './not-scheduled-surgery.component';

describe('NotScheduledSurgeryComponent', () => {
  let component: NotScheduledSurgeryComponent;
  let fixture: ComponentFixture<NotScheduledSurgeryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotScheduledSurgeryComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotScheduledSurgeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
