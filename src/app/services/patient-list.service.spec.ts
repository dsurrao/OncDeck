import { TestBed } from '@angular/core/testing';

import { PatientListService } from './patient-list.service';

describe('PatientListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PatientListService = TestBed.get(PatientListService);
    expect(service).toBeTruthy();
  });
});
