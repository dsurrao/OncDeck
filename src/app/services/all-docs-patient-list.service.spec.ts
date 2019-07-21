import { TestBed } from '@angular/core/testing';

import { AllDocsPatientListService } from './all-docs-patient-list.service';

describe('AllDocsPatientListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AllDocsPatientListService = TestBed.get(AllDocsPatientListService);
    expect(service).toBeTruthy();
  });
});
